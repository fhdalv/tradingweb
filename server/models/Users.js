const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

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
        toJSON:{
            virtuals: true
        },

        id: false
    }
);

//password hasher
usersSchema.pre('save',async function(next){
    if(this.isNew||this.isModified('password')){
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password,saltRounds);
    }
    next();
});

usersSchema.methods.isCorrectPassword = async function(pass){
    return bcrypt.compare(pass, this.password);
}

const Users = model('Users', usersSchema);

module.exports = Users;