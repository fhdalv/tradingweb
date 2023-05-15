const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        password: {
            type: String,
            require: true,
            unique: true,
        },

        email: {
            type: String,
            require: true,
            unique: true,
            match: [/.+@.+\..+/, 'Invalid Email']
        },

        companyName: {
            type: String,
        },

        phoneNumber: {
            type: Number
        }
    },
    {
        id: false
    }
);

const User = model('User', userSchema);

module.exports = User;