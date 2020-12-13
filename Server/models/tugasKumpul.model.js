const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const tugasKumpulSchema = new Schema({
    id_user : {
        type: String,
        trim: true,
        required: true,
    },
    id_tugas : {
        type: String,
        trim: true,
        required: true,
    },
    deskripsi: {
        type: String,
        trim: true,
    },
    file: {
        type: String,
        trim: true,
    },
    nilai: {
        type: String,
        trim: true,
    },
    catatan: {
        type: String,
        trim: true,
    },
    date_created : {
        type: String,
        trim: true,
    },
    date_modified : {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
    collection : 'tugas_kumpul'
})

tugasKumpulSchema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

const tugasKumpulData = mongoose.model('tugas_kumpul', tugasKumpulSchema)

module.exports = tugasKumpulData
