const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const anggotaKelasSchema = new Schema({ 
    id_user : { 
        type: String, 
        trim: true,
        index: true,
        required: true
    },
    id_kelas : { 
        type: Schema.Types.ObjectId, ref: 'kelas' 
    },
    status : { 
        type: String, 
        trim: true,
        required: true,
    }
}, { 
    timestamps: true, 
    collection : 'anggota_kelas' 
})

const anggotaKelas = mongoose.model('anggota_kelas', anggotaKelasSchema)

module.exports = anggotaKelas