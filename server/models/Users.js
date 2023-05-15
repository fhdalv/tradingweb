const {Schema, model} = require('mongoose');

const usersSchema = new Schema(
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

const Users = model('Users', usersSchema);

module.exports = Users;