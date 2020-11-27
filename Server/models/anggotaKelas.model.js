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
        type: String, 
        trim: true,
        required: true,
    },
    status : { 
        type: String, 
        trim: true,
        required: true,
    },
}, { 
    timestamps: true, 
    collection : 'anggota_kelas' 
})

anggotaKelasSchema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

const anggotaKelas = mongoose.model('anggota_kelas', anggotaKelasSchema)

module.exports = anggotaKelas