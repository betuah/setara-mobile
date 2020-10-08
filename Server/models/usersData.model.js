const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const userDataSchema = new Schema({ 
    uname : { 
        type: String, 
        trim: true,
        index: true,
        required: true,
        unique: true
    },
    name : { 
        type: String, 
        trim: true,
        required: true,
    },
    email : { 
        type: String, 
        trim: true,
        required: true,
    },
    password : { 
        type: String, 
        trim: true,
        required: true,
    },
}, { timestamps: true })

userDataSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.password;
    }
});

const usersData = mongoose.model('users_data', userDataSchema)

module.exports = usersData