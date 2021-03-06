const { mongoConnLms }  = require('../config/db_mongoDB');
const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;

const feedbackSchema = new Schema({
    id_user : {
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    saran: {
        type: String,
        trim: true,
        require: true
    }
}, {
    timestamps: true,
})

const feedbackData = mongoConnLms.model('user_feedback', feedbackSchema)

module.exports = feedbackData