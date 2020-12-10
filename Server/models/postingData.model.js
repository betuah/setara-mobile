const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const postingSchema = new Schema({
    isi_postingan : {
        type: String,
        trim: true,
        required: true,
    },
    id_kelas : {
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
    collection : 'posting'
})

postingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

const postingData = mongoose.model('posting', postingSchema)

module.exports = postingData
