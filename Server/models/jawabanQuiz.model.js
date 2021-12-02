const { mongoConnLms }  = require('../config/db_mongoDB');
const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;

const jawabanQuiz = new Schema({
    id_quiz : {
        type: String,
        trim: true,
        required: true,
    },
    id_soal : {
        type: String,
        trim: true,
        required: true,
    },
    id_user : {
        type: String,
        trim: true,
        required: true,
    },
    id_opsi_soal : {
        type: String,
        trim: true,
    },
    status : {
        type: String,
        trim: true,
        required: true,
    },
    status : {
        type: String,
        trim: true,
        required: true,
    },
    date_modified : {
        type: String,
        trim: true,
    }
}, {
    timestamps: false,
    collection : 'jawaban_user'
});

jawabanQuiz.set('toJSON', {
    virtuals: true,
    versionKey: false
});

const jawabanQuizData = mongoConnLms.model('jawabanQuiz', jawabanQuiz);

module.exports = jawabanQuizData;
