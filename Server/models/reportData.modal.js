const { mongoConnLms }  = require('../config/db_mongoDB');
const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;

const reportSchema = new Schema({
    id_user : {
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    judul: {
        type: String,
        trim: true,
        require: true
    },
    detail: {
        type: String,
        trim: true,
        require: true
    }
}, {
    timestamps: true,
});

const reportData = mongoConnLms.model('user_report', reportSchema);

module.exports = reportData;