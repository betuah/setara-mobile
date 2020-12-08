const Modul     = require('../models/modulData.model')
const Materi    = require('../models/materiData.model')

exports.getListMateri = async (req, res) => {
    
    const getAllMateri = new Promise(async (resolve, reject) => {
        try {
            const mapelId = req.params.mapelId
            let materiData = []
    
            const modulData = await Modul.find({ id_mapel: mapelId})
    
            if (modulData.length > 0) {
                modulData.map(async (item, index, array) => {
                    Materi.find({ id_modul: item._id}).then(subMateri => {
                        const tempData = {
                            ...item._doc,
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