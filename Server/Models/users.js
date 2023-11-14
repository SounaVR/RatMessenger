const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    createdAt: { type: Date, default: Date.now }
});

const model = mongoose.model('users', schema);

module.exports = model;