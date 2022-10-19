const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileIamge:{
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    accountType: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;