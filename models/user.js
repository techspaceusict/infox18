const mongoose = require("mongoose"),
    bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    username: String,
    password: String
});

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("user", userSchema);