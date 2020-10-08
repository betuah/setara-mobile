const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RefreshTokenSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'users_Data' 
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

RefreshTokenSchema.virtual('isExpired').get(() => {
    return Date.now() >= this.expires;
})

RefreshTokenSchema.virtual('isActive').get(() => {
    return !this.revoked || !this.isExpired;
})

RefreshTokenSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.user;
    }
})

module.exports = mongoose.model('token_Data', RefreshTokenSchema)