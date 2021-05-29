const { mongoConnLms }  = require('../config/db_mongoDB');
const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;

const mapelSchema = new Schema({ 
    id_kelas : { 
        type: String, 
        trim: true,
        required: true,
    },
    nama : { 
        type: String, 
        trim: true,
        required: true,
    },
    silabus: {
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
    collection : 'mata_pelajaran' 
})

mapelSchema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

const mapelData = mongoConnLms.model('mata_pelajaran', mapelSchema)

module.exports = mapelData