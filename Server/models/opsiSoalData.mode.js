const { mongoConnLms }  = require('../config/db_mongoDB');
const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;

const opsiSoal = new Schema({
    id_soal : {
        type: String,
        trim: true,
        required: true,
    },
    text : {
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
    collection : 'opsi_soal'
});

opsiSoal.set('toJSON', {
    virtuals: true,
    versionKey: false
});

const opsiSoalData = mongoConnLms.model('opsiSoal', opsiSoal);

module.exports = opsiSoalData;
