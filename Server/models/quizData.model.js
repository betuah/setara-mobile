const { mongoConnLms }  = require('../config/db_mongoDB');
const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;

const quizSchema = new Schema({
    id_modul : {
        type: String,
        trim: true,
        required: true,
    },
    id_paket : {
        type: String,
        trim: true,
        required: true,
    },
    nama : {
        type: String,
        trim: true,
        required: true,
    },
    durasi : {
        type: String,
        trim: true,
        required: true,
    },
    start_date : {
        type: String,
        trim: true,
        required: true,
    },
    end_date : {
        type: String,
        trim: true,
        required: true,
    },
    creator : {
        type: String,
        trim: true,
        required: true,
    },
    status: {
        type: String,
        trim: true,
        required: true,
    },
    jenis: {
        type: String,
        trim: true,
        required: true,
    },
    random_soal : {
        type: String,
        trim: true,
        required: true,
    },
    random_opsi : {
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
    collection : 'quiz'
})

quizSchema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

const quizData = mongoConnLms.model('quiz', quizSchema)

module.exports = quizData
