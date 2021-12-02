const { mongoConnLms }  = require('../config/db_mongoDB');
const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;

const sekolahIndukSchema = new Schema({
    npsn: {
        type: String,
        trim: true,
        require: true
    },
    nama_sekolah_induk: {
        type: String,
        trim: true,
        require: true
    },
    sekolah_id: {
        type: String,
        trim: true,
        require: true
    },
    program: {
        type: String,
        trim: true,
    },
    kab_kot: {
        type: String,
        trim: true,
    },
    provinsi: {
        type: String,
        trim: true,
    },
    alamat: {
        type: String,
        trim: true,
    },
    pimpinan: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    nama_operator: {
        type: String,
        trim: true,
    },
    nomor_operator: {
        type: String,
        trim: true,
    },
    file: {
        type: String,
        trim: true,
    },
    ttd: {
        type: String,
        trim: true,
    },
    jenis: {
        type: String,
        trim: true,
    },
    pengawas: {
        type: String,
        trim: true,
    },
    update: {
        type: String,
        trim: true,
    }
}, {
    timestamps: false,
    collection : 'sekolah_induk'
});

const sekolahIndukData = mongoConnLms.model('sekolah_induk', sekolahIndukSchema);

module.exports = sekolahIndukData;