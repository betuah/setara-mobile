const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const userDataSchema = new Schema({ 
    username : { 
        type: String, 
        trim: true,
        index: true,
        required: true,
        unique: true
    },
    nama : { 
        type: String, 
        trim: true,
        required: true,
    },
    email : { 
        type: String, 
        trim: true
    },
    jk : { 
        type: String, 
        trim: true
    },
    sekolah : { 
        type: String, 
        trim: true
    },
    status : { 
        type: String, 
        trim: true
    },
    password : { 
        type: String, 
        trim: true,
        required: true,
    },
    provinsi : { 
        type: String, 
        trim: true
    },
    kota : { 
        type: String, 
        trim: true
    },
    program : { 
        type: String, 
        trim: true
    },
    sosmed : {},
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

const usersData = mongoose.model('user', userDataSchema)

module.exports = usersData