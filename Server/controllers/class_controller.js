const env           = require("../env");
const Mapel         = require("../models/mapelData.model");
const Kelas         = require("../models/kelasData.model");
const User          = require("../models/usersData.model");
const AnggotaKelas  = require("../models/anggotaKelas.model");

exports.getAllClass = async (req, res) => {
    const id = req.userId;
    
    const getDetails = new Promise(async (resolve, reject) => {
        try {
            let detailKelas = []
            const dataKelas = await AnggotaKelas.find({ id_user: id})

            if (dataKelas.length > 0) {
                dataKelas.map(async (item, index, array) => {
                    let role = '';

                    switch (item.status) {
                        case '1':
                            role = 'Administrator Kelas'
                            break;
                        case '2':
                            role = 'Tutor (Pengampu Mata Pelajaran)'
                            break;
                        case '3':
                            role = 'Tutor (Pendamping)'
                            break;
                        default:
                            role = 'Warga Belajar'
                            break;
                    }

                    Kelas.findOne({ _id: item.id_kelas}).then(resKelas => {
                        const resData = {
                            id_kelas: resKelas.id,
                            status: role,
                            nama: resKelas.nama,
                            role: item.status
                        }
                        detailKelas.push(resData)

                        if (detailKelas.length === array.length) resolve(detailKelas);
                    }).catch(err => {
                        reject(err);
                    })
                })
            } else {
                resolve([])
            }            
        } catch (error) {
            reject(err);
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

exports.getDetailClass = (req, res) => {
    const id_class = req.params.classId

    const maleAvatar = 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
    const femaleAvatar = 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairCurvy&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'

    const getDetails = new Promise(async (resolve, reject) => {
        try {
            const dataKelas = await Kelas.findOne({ _id: id_class})
            const dataMapel = await Mapel.find({id_kelas: dataKelas.id})

            let detailsData = {
                id: dataKelas.id,
                code: dataKelas.kode,
                name: dataKelas.nama,
                about: dataKelas.tentang,
                status: dataKelas.status,
                listMapel: dataMapel,
                listMembers: []
            }

            let listMembers = []
            const memberClass = await AnggotaKelas.find({id_kelas: dataKelas.id})

            if (memberClass.length > 0) {
                memberClass.map(async (item, index, array) => {
                    let role = '';

                    switch (item.status) {
                        case '1':
                            role = 'Administrator Kelas'
                            break;
                        case '2':
                            role = 'Tutor (Pengampu Mata Pelajaran)'
                            break;
                        case '3':
                            role = 'Tutor (Pendamping)'
                            break;
                        default:
                            role = 'Warga Belajar'
                            break;
                    }

                    User.findOne({ _id: item.id_user}).then(resUser => {
                        const resData = {
                            id: resUser._id,
                            name: resUser.nama,
                            school: resUser.sekolah ? resUser.sekolah : '-',
                            jk: resUser.jk,
                            picture: resUser.foto ? `${env.picture_path}${resUser.foto}` : (resUser.jk === 'Perempuan' ? femaleAvatar : maleAvatar),
                            role_name: role,
                            role: item.status,
                        }
                        
                        listMembers.push(resData)

                        if (listMembers.length === array.length) resolve({...detailsData, listMembers});
                    }).catch(err => reject(err))
                })
            } else {
                resolve([])
            }
        } catch (err) {
            reject(err);
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