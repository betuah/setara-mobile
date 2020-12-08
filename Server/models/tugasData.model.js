const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const tugasSchema = new Schema({
    id_modul : {
        type: String,
        trim: true,
        required: true,
    },
    nama : {
        type: String,
        trim: true,
        required: true,
    },
    deskripsi: {
        type: String,
        trim: true,
        required: true,
    },
    deadline: {
        type: String,
        trim: true,
        required: true,
    },
    creator : {
        type: String,
        trim: true,
        required: true,
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
    collection : 'tugas'
})

tugasSchema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

const tugasData = mongoose.model('tugas', tugasSchema)

module.exports = tugasData
