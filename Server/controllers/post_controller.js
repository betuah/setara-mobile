const env           = require("../env");
const Kelas         = require("../models/kelasData.model");
const User          = require("../models/usersData.model");
const Posting       = require("../models/postingData.model");
const AnggotaKelas  = require("../models/anggotaKelas.model");

exports.getDetailPosting = async (req, res) => {
    const id_posting  = req.params.postingId

    const getDetails = new Promise(async (resolve, reject) => {
        try {
            const dataPosting = await Posting.findOne({ _id: id_posting })

            if(dataPosting){
                try {
                    const creator = await User.findOne({_id: dataPosting.creator})
                    const kelas   = await Kelas.findOne({_id: dataPosting.id_kelas})

                    AnggotaKelas.findOne({id_user: dataPosting.creator, id_kelas: dataPosting.id_kelas}).then(anggotaKelas => {
                        if(anggotaKelas){
                            switch (anggotaKelas.status) {
                                case '1':
                                    status_creator = 'Administrator Kelas'
                                    break;
                                case '2':
                                    status_creator = 'Tutor (Pengampu Mata Pelajaran)'
                                    break;
                                case '3':
                                    status_creator = 'Tutor (Pendamping)'
                                    break;
                                default:
                                    status_creator = 'Warga Belajar'
                                    break;
                            }
                        }else{
                            status_creator = 'Administrator Kelas'
                        }
                    }).finally(() => {
                        const newDataPosting = {
                            ...dataPosting._doc,
                            foto_creator: `${env.picture_path}${creator.foto}`,
                            nama_creator: creator.nama,
                            status_creator: status_creator,
                            nama_kelas: kelas.nama
                        }
                        resolve(newDataPosting)
                    })
                } catch (e) {
                    console.log(new Error(e))
                }
            }else{
                reject([])
            }
        } catch (error) {
            reject(error)
        }
    })

    getDetails.then(resDetailKelas => {
        const resJson = {
            code: 'OK',
            status: 'Success',
            data: resDetailKelas
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

exports.getPosting = async (req, res) => {
    const id_kelas  = req.params.classId

    const getDetails = new Promise(async (resolve, reject) => {
        try {
            let daftarPosting = []
            const dataPosting = await Posting.find({ id_kelas: id_kelas }).sort({ date_created: -1})

            if(dataPosting.length > 0){

                dataPosting.map(async (item, index, array) => {
                    try {
                        const creator = await User.findOne({_id: item.creator})
                        const kelas   = await Kelas.findOne({_id: item.id_kelas})

                        AnggotaKelas.findOne({id_user: item.creator, id_kelas: item.id_kelas}).then(anggotaKelas => {
                            if(anggotaKelas){
                                switch (anggotaKelas.status) {
                                    case '1':
                                        status_creator = 'Administrator Kelas'
                                        break;
                                    case '2':
                                        status_creator = 'Tutor (Pengampu Mata Pelajaran)'
                                        break;
                                    case '3':
                                        status_creator = 'Tutor (Pendamping)'
                                        break;
                                    default:
                                        status_creator = 'Warga Belajar'
                                        break;
                                }
                            }else{
                                status_creator = 'Administrator Kelas'
                            }
                        }).finally(() => {
                            const tempData = {
                                ...item._doc,
                                foto_creator: `${env.picture_path}${creator.foto}`,
                                nama_creator: creator.nama,
                                status_creator: status_creator,
                                nama_kelas: kelas.nama
                            }

                            daftarPosting.push(tempData)

                            if(daftarPosting.length === array.length) {
                                resolve(daftarPosting)
                            }
                        })
                    } catch (e) {
                        console.log(new Error(e))
                    }
                })
            }else{
                reject([])
            }

        } catch (error) {
            reject(error);
        }
    })

    getDetails.then(resDetailKelas => {
        const resJson = {
            code: 'OK',
            status: 'Success',
            data: resDetailKelas
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

exports.getAllPosting = async (req, res) => {
    const id = req.userId

    const getDetails = new Promise(async (resolve, reject) => {
        try {
            let daftarPosting   = []

            const dataKelas = await AnggotaKelas.find({ id_user: id})

            if (dataKelas.length > 0) {

                const getDataPosting = new Promise((resolve, reject) => {

                    let listPosting = []
                    let indexDataKelas = 0
                    dataKelas.map(async (item, index, array) => {

                        const dataPosting       = await Posting.find({ id_kelas: item.id_kelas }).sort({ date_created: -1})
                        indexDataKelas++

                        listPosting = ([...listPosting,...dataPosting])

                        if (indexDataKelas === array.length) {
                            resolve(listPosting)
                        }
                    })
                })

                daftarPosting = await getDataPosting

                if(daftarPosting.length > 0){
                    let newDaftarPosting = []
                    daftarPosting.map(async (item, index, array) => {
                        try {
                            let status_creator  = ''
                            const creator       = await User.findOne({_id: item.creator})
                            const kelas         = await Kelas.findOne({_id: item.id_kelas})

                            AnggotaKelas.findOne({id_user: item.creator, id_kelas: item.id_kelas}).then(anggotaKelas => {
                                if(anggotaKelas){
                                    switch (anggotaKelas.status) {
                                        case '1':
                                            status_creator = 'Administrator Kelas'
                                            break;
                                        case '2':
                                            status_creator = 'Tutor (Pengampu Mata Pelajaran)'
                                            break;
                                        case '3':
                                            status_creator = 'Tutor (Pendamping)'
                                            break;
                                        default:
                                            status_creator = 'Warga Belajar'
                                            break;
                                    }
                                }else{
                                    status_creator = 'Administrator Kelas'
                                }
                            }).finally(() => {
                                const tempData = {
                                    ...item._doc,
                                    foto_creator: `${env.picture_path}${creator.foto}`,
                                    nama_creator: creator.nama,
                                    status_creator: status_creator,
                                    nama_kelas: kelas.nama
                                }

                                newDaftarPosting.push(tempData)

                                if(newDaftarPosting.length === array.length) {
                                    resolve(newDaftarPosting)
                                }
                            })
                        } catch (e) {
                            console.log(new Error(e))
                        }
                    })
                }else{
                    reject([])
                }

            } else {
                resolve([])
            }
        } catch (error) {
            reject(error);
        }
    })

    getDetails.then(resDetailKelas => {
        const resJson = {
            code: 'OK',
            status: 'Success',
            data: resDetailKelas
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
