const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
});

module.exports = mongoose.model('User', userSchema);
