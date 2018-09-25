const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    name: String,
    image: String,
    college: String,
    branch: String,
    year: String,
    degree: String,
    phone: String,
    email: String,
    lid: String,
    gender: String,
    token: String,
    type: { type: Number, default: 0},
    contact: { type: Number },
    events: [{ type: String }],
    loginType: String
});

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("user", userSchema);