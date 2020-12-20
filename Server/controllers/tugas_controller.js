const multer        = require('multer')
const fs            = require('fs')
const Modul         = require('../models/modulData.model')
const ModulKumpul   = require('../models/modulKumpul.model')
const Tugas         = require('../models/tugasData.model')
const TugasKumpul   = require('../models/tugasKumpul.model')
const Quiz          = require('../models/quizData.model')
const QuizKumpul    = require('../models/quizKumpul.model')
const Soal          = require('../models/soalData.model')
const Materi        = require('../models/materiData.model')

exports.getListTugas = async (req, res) => {

    const getAllTugas = new Promise(async (resolve, reject) => {
        try {
            const userId = req.userId;

            const mapelId = req.params.mapelId
            let tugasData = []

            const modulData = await Modul.find({ id_mapel: mapelId}).sort({ date_created: 'asc'}) //Sort ascending by date_created

            if (modulData.length > 0) {
                modulData.map(async (item, index, array) => {

                    let nilai_akhir_modul   = 0
                    let status_modul        = 'unlocked'

                    const getNilaiModul = (id_modul) => new Promise(async (resolve, reject) => {

                        const modulKumpulData   = await ModulKumpul.findOne({ id_user: userId, id_modul: id_modul})
                        const tugasData         = await Tugas.find({ id_modul: id_modul})
                        const quizData          = await Quiz.find({ id_modul: id_modul})

                        let nilai_baca_materi   = 100
                        let nilai_kumpul_tugas  = 100
                        let nilai_kumpul_quiz   = 100
                        let nilai_modul         = 0

                        if (!modulKumpulData){
                            nilai_baca_materi = 0
                        }

                        const getNilaiTugas = new Promise ((resolve, reject) => {
                            if (tugasData.length > 0){
                                nilai_kumpul_tugas  = 0
                                let listTugas       = []
                                let tempTugas
                                let status_kumpul
                                let nilai_tugas

                                tugasData.map( async (tugas, index, array)  => {
                                    try {
                                        const tugasKumpulData = await TugasKumpul.findOne({ id_user: userId, id_tugas: tugas._id})

                                        nilai_tugas         = tugasKumpulData.nilai

                                        if(tugasKumpulData) {
                                            nilai_kumpul_tugas += parseFloat(tugasKumpulData.nilai)
                                            status_kumpul = 'Sudah Mengerjakan'
                                        }

                                    } catch (e) {
                                        let today       = new Date()
                                        let deadline    = new Date(tugas.deadline)

                                        nilai_tugas = null
                                        status_kumpul = ((deadline-today) > 0) ? 'Belum Mengerjakan':'Tidak Mengerjakan'

                                    } finally{
                                        tempTugas = {
                                            ...tugas._doc,
                                            nilai_tugas: nilai_tugas,
                                            status_kumpul: status_kumpul
                                        }

                                        listTugas.push(tempTugas)
                                    }

                                    if(index === tugasData.length-1) {
                                        resolve({
                                            list_tugas: listTugas,
                                            rata_nilai: nilai_kumpul_tugas/tugasData.length
                                        })
                                        // resolve(nilai_kumpul_tugas/tugasData.length)
                                    }
                                })
                            }else{
                                resolve(nilai_kumpul_tugas)
                            }
                        })

                        const getNilaiQuiz = new Promise ((resolve, reject) => {
                            if (quizData.length > 0){
                                nilai_kumpul_quiz = 0

                                quizData.map( async (quiz, index, array)  => {
                                    try {
                                        const quizKumpulData    = await QuizKumpul.findOne({ id_user: userId, id_quiz: quiz._id})
                                        const soalData          = await Soal.find({ id_paket: quiz.id_paket})

                                        if(quizKumpulData) {
                                            nilai_kumpul_quiz   += (parseFloat(quizKumpulData.nilai)/soalData.length)*100
                                        }
                                    } catch (e) {
                                        // console.log(new Error(e))
                                    }

                                    if(index === quizData.length-1) {
                                        resolve(nilai_kumpul_quiz/quizData.length)
                                    }
                                })
                            }else{
                                resolve(nilai_kumpul_quiz)
                            }
                        })

                        nilai_kumpul_tugas = await getNilaiTugas
                        nilai_kumpul_quiz  = await getNilaiQuiz

                        nilai_modul = (nilai_baca_materi*item.nilai.materi/100)+(nilai_kumpul_tugas.rata_nilai*item.nilai.tugas/100)+(nilai_kumpul_quiz*item.nilai.ujian/100)

                        // resolve(nilai_modul)
                        resolve({
                            list_tugas: nilai_kumpul_tugas.list_tugas,
                            nilai: nilai_modul
                        })
                    })

                    nilai_akhir_modul = await getNilaiModul(item._id)

                    if (item.prasyarat!="0"){
                        nilai_akhir_modul_prev = await getNilaiModul(item.prasyarat)
                        if (nilai_akhir_modul_prev.nilai < item.nilai.minimal){
                            status_modul = 'locked'
                        }
                    }

                    const tempData = {
                        ...item._doc,
                        nilai_akhir_modul: nilai_akhir_modul.nilai,
                        status_modul: status_modul,
                        tugas: nilai_akhir_modul.list_tugas
                    }
                    tugasData.push(tempData)

                    if (tugasData.length === array.length) resolve(tugasData)

                    // Tugas.find({ id_modul: item._id}).sort({ date_created: 'asc'}).then(tugas => {
                    //     const tempData = {
                    //         ...item._doc,
                    //         nilai_akhir_modul: nilai_akhir_modul,
                    //         status_modul: status_modul,
                    //         tugas: tugas
                    //     }
                    //     tugasData.push(tempData)
                    //
                    //     if (tugasData.length === array.length) resolve(tugasData);
                    // }).catch(err => {
                    //     reject(err)
                    // })
                })
            } else {
                resolve([])
            }
        } catch (error) {
            reject(error)
        }
    })

    getAllTugas.then(resData => {
        const resJson = {
            code: 'OK',
            status: 'Success',
            data: resData
        }

        res.status(200).json(resJson)
    }).catch(err => {
        if (err.code) {
            res.status(err.code).json(err)
        } else {
            res.status(500).json(err)
        }
    })
}

exports.getTugasDetail = async (req, res) => {
    try {
        const userId    = req.userId
        const id        = req.params.tugasId

        let isi_tugas
        let lampiran_tugas
        let catatan_tugas
        let nilai_tugas
        let status_kumpul
        let status_code

        const tugasData = await Tugas.findOne({ _id: id})

        TugasKumpul.findOne({ id_user: userId, id_tugas: id}).then(tugasKumpulData => {
            nilai_tugas     = tugasKumpulData.nilai
            isi_tugas       = tugasKumpulData.deskripsi
            lampiran_tugas  = tugasKumpulData.file
            catatan_tugas   = tugasKumpulData.catatan
            status_kumpul   = 'Sudah Mengerjakan'
            status_code     = 2
        }).catch( e => {
            let today       = new Date()
            let deadline    = new Date(tugasData && tugasData.deadline)

            nilai_tugas     = null
            isi_tugas       = null
            lampiran_tugas  = null
            catatan_tugas   = null
            status_kumpul   = ((deadline-today) > 0) ? 'Belum Mengerjakan':'Tidak Mengerjakan'
            status_code     = ((deadline-today) > 0) ? 1 : 0
        }).finally(() => {
            tempTugas = {
                ...tugasData ? tugasData._doc : {},
                isi_tugas: isi_tugas,
                lampiran_tugas: lampiran_tugas,
                catatan_tugas: catatan_tugas,
                nilai_tugas: nilai_tugas,
                status_kumpul: status_kumpul,
                status_code: status_code
            }

            if (tugasData) {
                res.status(200).json({
                    code: 'OK',
                    status: 'success',
                    data: tempTugas
                })
            } else {
                res.status(404).json({
                    code: 'ERR_TUGAS_NOT_FOUND',
                    status: 'Tugas not found!',
                    message: 'Tugas tidak ditemukan'
                })
            }
        })
    } catch (error) {
        if (error.code) {
            res.status(error.code).json(error)
        } else {
            res.status(404).json({status: 'Error. Not Found!', code: 'ERR_MATERI_NOT_FOUND', message: `Tugas dengan ID tersebut tidak ditemukan.`})
        }
    }
}

exports.kumpulkanTugas = async (req, res) => {
    try {
        const fileData  = req.files.map(item => item.filename)
        const userId    = req.userId
        const tugasId   = req.params.tugasId
        const isi_tugas = req.body.isi_tugas ? req.body.isi_tugas : ''

        await TugasKumpul.create({
            id_user: userId,
            id_tugas: tugasId,
            deskripsi: isi_tugas,
            file: [...fileData],
            nilai: '',
            catatan:'',
        })

        const resData = {
            status: 'Success',
            code: 'OK',
            message: 'Berhasil Kumpul Tugas!',
        }

        res.status(200).json(resData)
    } catch (error) {
        console.log(error)
        res.status(500).json(err)
    }
}
