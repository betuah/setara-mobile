const { mongoConnLms }  = require('../config/db_mongoDB')
const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;

const refreshTokenSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'user' 
    },
    token: { 
        type: String,
        trim: true,
    },
    expires: { 
        type: Date,
    },
    created: { 
        type: Date, 
        default: Date.now },
    revoked: { 
        type: Date 
    },
    replacedByToken: { 
        type: String 
    }
})

refreshTokenSchema.virtual('isExpired').get(function() {
    return Date.now() >= this.expires
})

refreshTokenSchema.virtual('isActive').get(function() {
    return !this.revoked && !this.isExpired
})

refreshTokenSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id
        delete ret.user
    }
})

module.exports = mongoConnLms.model('token_Data', refreshTokenSchema)