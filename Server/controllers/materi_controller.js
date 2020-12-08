const Modul         = require('../models/modulData.model')
const ModulKumpul   = require('../models/modulKumpul.model')
const Tugas         = require('../models/tugasData.model')
const TugasKumpul   = require('../models/tugasKumpul.model')
const Quiz          = require('../models/quizData.model')
const QuizKumpul    = require('../models/quizKumpul.model')
const Soal          = require('../models/soalData.model')
const Materi        = require('../models/materiData.model')

exports.getListMateri = async (req, res) => {

    const getAllMateri = new Promise(async (resolve, reject) => {
        try {
            const userId = req.userId;

            const mapelId = req.params.mapelId
            let materiData = []

            const modulData = await Modul.find({ id_mapel: mapelId}).sort({ date_created: 1}) //Sort by date_created

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
                                nilai_kumpul_tugas = 0

                                tugasData.map( async (tugas, index, array)  => {
                                    try {
                                        const tugasKumpulData = await TugasKumpul.findOne({ id_user: userId, id_tugas: tugas._id})

                                        if(tugasKumpulData) {
                                            nilai_kumpul_tugas += parseFloat(tugasKumpulData.nilai)
                                        }

                                    } catch (e) {

                                    }

                                    if(index === tugasData.length-1) {
                                        resolve(nilai_kumpul_tugas/tugasData.length)
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

                        nilai_modul = (nilai_baca_materi*item.nilai.materi/100)+(nilai_kumpul_tugas*item.nilai.tugas/100)+(nilai_kumpul_quiz*item.nilai.ujian/100)

                        resolve(nilai_modul)
                    })

                    nilai_akhir_modul = await getNilaiModul(item._id)
                    console.log('Nilai akhir modul: ', nilai_akhir_modul)

                    if (item.prasyarat!="0"){
                        nilai_akhir_modul_prev = await getNilaiModul(item.prasyarat)
                        if (nilai_akhir_modul_prev < item.nilai.minimal){
                            status_modul = 'locked'
                        }
                    }

                    Materi.find({ id_modul: item._id}).then(subMateri => {
                        const tempData = {
                            ...item._doc,
                            nilai_akhir_modul: nilai_akhir_modul,
                            status_modul: status_modul,
                            materi: subMateri
                        }
                        materiData.push(tempData)

                        if (materiData.length === array.length) resolve(materiData);
                    }).catch(err => {
                        reject(err)
                    })
                })
            } else {
                resolve([])
            }
        } catch (error) {
            reject(error)
        }
    })

    getAllMateri.then(resData => {
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

exports.getMateriDetail = async (req, res) => {
    try {
        const id = req.params.materiId

        const materiData = await Materi.findOne({ _id: id})

        res.status(200).json(materiData)
    } catch (error) {
        if (error.code) {
            res.status(error.code).json(error)
        } else {
            res.status(404).json({status: 'Error. Not Found!', code: 'ERR_MATERI_NOT_FOUND', message: `Materi dengan ID tersebut tidak ditemukan.`})
        }
    }
}
