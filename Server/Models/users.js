const { Schema, model } = require('mongoose');

module.exports = model('Users', new Schema({
    username: String,
    email: String,
    password: String,
    createdAt: { type: Date, default: Date.now }
}))