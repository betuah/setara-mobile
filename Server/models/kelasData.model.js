const { mongoConnLms }  = require('../config/db_mongoDB');
const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;

const kelasSchema = new Schema({ 
    nama : { 
        type: String, 
        trim: true,
        required: true,
    },
    kode : { 
        type: String, 
        trim: true,
        required: true,
    },
    tentang : { 
        type: String, 
        trim: true,
    },
    tkb : { 
        type: String, 
        trim: true,
    },
    status : { 
        type: String, 
        trim: true,
    },
    creator : { 
        type: String, 
        trim: true,
        required: true,
    },
    sekolah : { 
        type: String, 
        trim: true,
    },
    update : { 
        type: Number, 
        trim: true,
    },
}, { 
    timestamps: true, 
    collection : 'kelas' 
})

kelasSchema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

const kelasData = mongoConnLms.model('kelas', kelasSchema)

module.exports = kelasData