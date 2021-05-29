const { mongoConnLms }  = require('../config/db_mongoDB');
const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;

const soalSchema = new Schema({
    id_paket : {
        type: String,
        trim: true,
        required: true,
    },
    jenis : {
        type: String,
        trim: true,
        required: true,
    },
    soal : {
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
    collection : 'soal'
});

soalSchema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

const soalData = mongoConnLms.model('soal', soalSchema);

module.exports = soalData;
