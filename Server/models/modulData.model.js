const { mongoConnLms }  = require('../config/db_mongoDB');
const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;

const modulSchema = new Schema({ 
    id_mapel : { 
        type: String, 
        trim: true,
        required: true,
    },
    nama : { 
        type: String, 
        trim: true,
        required: true,
    },
    prasyarat: {
        type: String, 
        trim: true,
        required: true,
    },
    nilai: {},
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
    collection : 'modul' 
})

modulSchema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

const modulData = mongoConnLms.model('modul', modulSchema)

module.exports = modulData