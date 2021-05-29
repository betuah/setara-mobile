const { mongoConnLms }  = require('../config/db_mongoDB');
const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;

const quizKumpulSchema = new Schema({
    id_user : {
        type: String,
        trim: true,
        required: true,
    },
    id_quiz : {
        type: String,
        trim: true,
        required: true,
    },
    nilai: {
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
    collection : 'kumpul_quiz'
})

quizKumpulSchema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

const quizKumpulData = mongoConnLms.model('kumpul_quiz', quizKumpulSchema)

module.exports = quizKumpulData
