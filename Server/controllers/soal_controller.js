const redisClient   = require('../config/redis_config')
const mongoose      = require('mongoose');
const moment        = require('moment')
const Modul         = require('../models/modulData.model')
const ModulKumpul   = require('../models/modulKumpul.model')
const Tugas         = require('../models/tugasData.model')
const TugasKumpul   = require('../models/tugasKumpul.model')
const Quiz          = require('../models/quizData.model')
const QuizKumpul    = require('../models/quizKumpul.model')
const Soal          = require('../models/soalData.model')
const opsiSoal      = require('../models/opsiSoalData.mode')
const JawabanModel  = require('../models/jawabanQuiz.model')

const getAllSoal = (paketId) => new Promise(async (resolve, reject) => {
    try {
        let soalData = []

        const soal = await Soal.find({ id_paket: paketId})

        if (soal.length > 0) {
            const getSoal = (soalItem) => new Promise(async (resolve, reject) => { 
                soalItem.map(async (item, index, array) => {
                    const getOpsi = (id_soal) => new Promise(async (resolve, reject) => {
                        try {
                            const opsiSoalData   = await opsiSoal.find({ id_soal: id_soal })
                            const resOpsi = opsiSoalData.map(item => {
                                return {
                                    id_opsi: item.id,
                                    text: item.text,
                                    status: item.status === 'benar' ? 1 : 0
                                }
                            })
                            resolve(resOpsi)
                        } catch (error) {
                            reject(error)
                        }
                    })

                    const opsi = await getOpsi(item._id)
                    const tempData = {
                        id_soal: item._id,
                        soal: item.soal,
                        opsi: opsi.sort(() => Math.random() - 0.5),
                    }
                    soalData.push(tempData)

                    if (soalData.length === array.length) resolve(soalData)
                })
            })

            redisClient.get(`${paketId}`, async (err, reply) => {
                if (reply) {
                    const tmpData = JSON.parse(reply)
                    const resData = {
                        ...tmpData,
                        soal: tmpData.soal.map(item => {
                            return {
                                ...item,
                                opsi: item.opsi.map(iObsi => {
                                    return {
                                        id_opsi: iObsi.id_opsi,
                                        text: iObsi.text
                                    }
                                }).sort(() => Math.random() - 0.5)
                            }
                        }).sort(() => Math.random() - 0.5)
                    }

                    resolve(resData)
                    return
                } else {
                    const listDataSoal = await getSoal(soal.sort(() => Math.random() - 0.5))
                    const tmpArr = {
                        id_paket: paketId,
                        jml_soal: soal.length,
                        soal: listDataSoal
                    }
                    redisClient.set(paketId, JSON.stringify(tmpArr), 'EX', 60 * 60 * 24 * 1)
                    resolve({
                        ...tmpArr,
                        soal: tmpArr.soal.map(itemSoal => {
                            return {
                                ...itemSoal,
                                opsi: itemSoal.opsi.map(itemOpsi => {
                                    return {
                                        id_opsi: itemOpsi.id_opsi,
                                        text: itemOpsi.text
                                    }
                                })
                            }
                        })
                    })
                }
            })
        } else {
            resolve([])
        }
    } catch (error) {
        reject(error)
    }
})

exports.getListQuiz = async (req, res) => {

    const getAllQuiz = new Promise(async (resolve, reject) => {
        try {
            const userId = req.userId;

            const mapelId = req.params.mapelId
            let quizData = []

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
                                nilai_kumpul_tugas = 0

                                tugasData.map( async (tugas, index, array)  => {
                                    try {
                                        const tugasKumpulData = await TugasKumpul.findOne({ id_user: userId, id_tugas: tugas._id})

                                        if(tugasKumpulData) {
                                            nilai_kumpul_tugas += parseFloat(tugasKumpulData.nilai)
                                        }

                                    } catch (e) {
                                        reject(e)
                                    }

                                    if(index === tugasData.length-1) {
                                        resolve(nilai_kumpul_tugas / tugasData.length)
                                    }
                                })
                            }else{
                                resolve(nilai_kumpul_tugas)
                            }
                        })

                        const getNilaiQuiz = new Promise ((resolve, reject) => {
                            if (quizData.length > 0){
                                nilai_kumpul_quiz = 0
                                let listQuiz       = []
                                let tempQuiz
                                let status_kumpul
                                let nilai_quiz
                                let status_code

                                quizData.map( async (quiz, index, array)  => {
                                    try {
                                        const quizKumpulData    = await QuizKumpul.findOne({ id_user: userId, id_quiz: quiz._id})
                                        const soalData          = await Soal.find({ id_paket: quiz.id_paket})

                                        nilai_quiz = quizKumpulData.nilai

                                        if(quizKumpulData) {
                                            nilai_kumpul_quiz   += (parseFloat(quizKumpulData.nilai)/soalData.length)*100
                                            status_kumpul   = 'Sudah Mengerjakan'
                                            status_code     = 2
                                        }

                                    } catch (e) {
                                        let today       = new Date()
                                        let deadline    = new Date(quiz.end_date)

                                        nilai_quiz   = 0
                                        status_kumpul = ((deadline-today) > 0) ? 'Belum Mengerjakan':'Tidak Mengerjakan'
                                        status_code   = ((deadline-today) > 0) ? 1 : 0
                                    } finally{
                                        tempQuiz = {
                                            ...quiz._doc,
                                            nilai_quiz: nilai_quiz,
                                            status_kumpul: status_kumpul,
                                            status_code: status_code,
                                        }

                                        listQuiz.push(tempQuiz)
                                    }

                                    if(index === quizData.length-1) {
                                        const tmp = {
                                            list_quiz: listQuiz.map(item => item.jenis ? (item.jenis !== '1' && item) : item),
                                            rata_nilai: nilai_kumpul_tugas/quizData.length
                                        }
                                        resolve(tmp)
                                        // resolve(nilai_kumpul_tugas/tugasData.length)
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
                            list_quiz: nilai_kumpul_quiz.list_quiz,
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
                        quiz: nilai_akhir_modul.list_quiz
                    }
                    quizData.push(tempData)

                    if (quizData.length === array.length) resolve(quizData)
                })
            } else {
                resolve([])
            }
        } catch (error) {
            reject(error)
        }
    })

    getAllQuiz.then(resData => {
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

exports.getQuizDetail = async (req, res) => {
    try {
        const userId    = req.userId
        const id        = req.params.quizId

        let nilai_quiz
        let status_kumpul
        let status_code

        const quizData  = await Quiz.findOne({ _id: id})
        const getSoal   = await getAllSoal(quizData.id_paket)
        const countSoal = getSoal.soal.length

        QuizKumpul.findOne({ id_user: userId, id_quiz: id}).then(quizKumpulData => {
            nilai_quiz      = quizKumpulData.nilai
            status_kumpul   = 'Sudah Mengerjakan'
            status_code     = 2
            jml_soal        = countSoal
        }).catch( e => {
            let today       = new Date()
            let deadline    = new Date(quizData && quizData.end_date)

            nilai_quiz      = 0
            status_kumpul   = ((deadline-today) > 0) ? 'Belum Mengerjakan':'Tidak Mengerjakan'
            status_code     = ((deadline-today) > 0) ? 1 : 0
            jml_soal        = countSoal
        }).finally(() => {
            tempQuiz = {
                ...quizData ? quizData._doc : {},
                nilai_quiz: nilai_quiz,
                status_kumpul: status_kumpul,
                status_code: status_code,
                jml_soal: countSoal
            }

            if (quizData) {
                res.status(200).json({
                    code: 'OK',
                    status: 'success',
                    data: tempQuiz
                })
            } else {
                res.status(404).json({
                    code: 'ERR_QUIZ_NOT_FOUND',
                    status: 'Quiz not found!',
                    message: 'Quiz tidak ditemukan'
                })
            }
        })
    } catch (error) {
        if (error.code) {
            res.status(error.code).json(error)
        } else {
            res.status(404).json({status: 'Error. Not Found!', code: 'ERR_QUIZ_NOT_FOUND', message: `Tugas dengan ID tersebut tidak ditemukan.`})
        }
    }
}

exports.getPaketSoal = async (req, res) => {

    getAllSoal(req.params.paketId).then(resData => {
        const resJson = {
            code: 'OK',
            status: 'Success',
            data: resData
        }

        res.status(200).json(resJson)
    }).catch(err => {
        console.log(JSON.stringify(err))
        if (err.code) {
            res.status(err.code).json(err)
        } else {
            res.status(500).json(err)
        }
    })
}

exports.jawabanQuiz = async (req, res) => {
    try {
        const checkNilai  = await QuizKumpul.find({ id_quiz: req.params.quizId, id_user: req.userId })
        if (checkNilai.length > 0) {
            res.status(409).json({
                code: 'ERROR',
                status: 'ERR_DATA_EXIST',
                message: "Your quiz scores have been saved.",
                data: checkNilai
            })
            return
        }

        const currentdate = new Date();
        const userId      = req.userId
        const quizId      = req.params.quizId
        const paketId     = req.body.id_paket || (function(){ throw ({code: 400, err: "paketID is required."})}) 
        const userAnswer  = req.body.jawaban instanceof Array ? req.body.jawaban : (function(){ throw ({code: 400, err: "jawaban is required and must be an array."})}()) 

        const getListSoal = key => new Promise(async (resolve, reject) => {
            redisClient.get(`${key}`, async (err, reply) => {
                if (reply) {
                    resolve(JSON.parse(reply))
                    return
                } else {
                    try {
                        const storeSoal = await getAllSoal(key)
                        resolve(storeSoal)
                    } catch (error) {
                        reject(error)
                    }
                }
            })
        })
        
        const tmpSoal        = await getListSoal(paketId)
        const listSoal       = tmpSoal.soal
        const answerData     = listSoal.length === userAnswer.length ? userAnswer : (function(){ throw ({code: 400, err: "Invalid Request! Questions and answers amount are not the same."})}()) 
        const checkAnswer    = answerData.map(answerItem => {
            const statusOpsiTmp = listSoal.find(listItem => listItem.id_soal === answerItem.id_soal).opsi.find(opsiItem => opsiItem.id_opsi === answerItem.id_opsi)
            const statusOpsi    = statusOpsiTmp !== undefined ? statusOpsiTmp.status : 0
            return {
                id_quiz: quizId,
                id_soal: answerItem.id_soal,
                id_user: userId,
                id_opsi_soal: answerItem.id_opsi,
                status: statusOpsi === 1 ? 'benar' : 'salah',
                date_modified: moment(currentdate).format('YYYY-MM-DD h:mm:ss')
            }
        })
        const trueAnswer     = checkAnswer.filter(trueItem => trueItem.status === 'benar').length
        const score          = Math.ceil((trueAnswer / listSoal.length) * 100)
        const result         = {
            id_quiz: quizId,
            id_user: userId,
            nilai: score,
            date_modified: moment(currentdate).format('YYYY-MM-DD h:mm:ss')
        }

        JawabanModel.create(checkAnswer).then(data => {
            QuizKumpul.create(result).then(() => {
                res.status(200).json({
                    code: 'OK',
                    status: 'Success',
                    data: result
                })
            }).catch(err => {
                const delId = data.map(item => item.id)
                JawabanModel.deleteMany({ _id: { $in: [...delId]}})
                    .then(sc => {
                        res.status(500).json({
                            code: 'ERR',
                            status: 'ERROR_SAVE_SCORE',
                            message: 'Internal server error.'
                        })
                    })
                    .catch(e => {
                        res.status(500).json({
                            code: 'ERR',
                            status: 'ERROR_DEL_ANSWER',
                            message: 'Internal server error.'
                        })
                    })
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                code: 'ERR',
                status: 'ERROR_SAVE_ANSWER',
                message: 'Internal server error.'
            })
        })
        
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') console.log(new Error(JSON.stringify(error)), 'error 500')
        if (error.code || error.status) {
            res.status(error.code).json({
                code: 'ERR',
                status: error.status || 'ERROR',
                message: 'Internal server error.'
            })
        } else {
            res.status(500).json({
                code: 'ERR',
                status: 'INT_SRV_ERROR',
                message: 'Internal Server Error.'
            })
        }
    }
}