const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const modulKumpulSchema = new Schema({
    id_user : {
        type: String,
        trim: true,
        required: true,
    },
    id_modul : {
        type: String,
        trim: true,
        required: true,
    },
    nilai: {
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
    collection : 'modul_kumpul'
})

modulKumpulSchema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

const modulKumpul = mongoose.model('modul_kumpul', modulKumpulSchema)

module.exports = modulKumpul
