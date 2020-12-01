const Kelas         = require('../models/kelasData.model') // Import Kelas Model
const AnggotaKelas  = require('../models/anggotaKelas.model') // Import Anggota Kelas Model

const index = async (req, res) => {
    res.status(200).send('I am alive')
}

// Start user detail function
const daftarKelas = async (req, res) => {
    const id    = req.userId // Get UserId from middleware

    AnggotaKelas.find({ id_user: id }).then(async (user) => {
        console.log('berhasil')

        // const dataKelas = []
        const loop = new Promise((resolve, reject) => {
            let zxc = []
            user.forEach(async item => {
                const data = await Kelas.findById({ _id: item.id_kelas })
                zxc.push(data)
            })

            resolve(zxc)
        })

        const ll = await loop
        console.log(ll)
        // const dataKelas = user.map(async item => {
        //     const data = await Kelas.findById({ _id: item.id_kelas })
        //     console.log(data)
        //     // dataKelas.push(data)
        //     return item.data = {...data}
        // })
        const a = {
            data: dataKelas,
            jumlah: user.length,
        }
        res.status(200).json(a)
    }).catch(error => {
        console.log('gagal')
        res.status(200).send(error)
    })

}

module.exports = {
    index,
    daftarKelas
}
