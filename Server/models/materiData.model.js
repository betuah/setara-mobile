const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const materiSchema = new Schema({ 
    id_modul : { 
        type: String, 
        trim: true,
        required: true,
    },
    judul : { 
        type: String, 
        trim: true,
        required: true,
    },
    isi: {
        type: String, 
        trim: true,
        required: true,
    },
    file: {
        type: String, 
        trim: true,
    },
    status: {
        type: String, 
        trim: true,
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
    collection : 'materi' 
})

materiSchema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

const materiData = mongoose.model('materi', materiSchema)

module.exports = materiData