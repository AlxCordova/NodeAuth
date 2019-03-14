const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    local: {
        email: String,
        password: String
    },
    facebook: {
        email: String,
        password: String,
        id: String,
        token: String
    },
    twitter: {
        email: String,
        password: String,
        id: String,
        token: String
    },
    google: {
        email: String,
        password: String,
        id: String,
        token: String
    },
});

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSalt(8), null); //cifra la contraseña
};

userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.local.password); //compara la contraseña con la que esta almacenada en la bd
};

module.exports = mongoose.model('User', userSchema);