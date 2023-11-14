const { Schema, model } = require('mongoose');

module.exports = model('Servers', new Schema({
    name: String,
    members: Array,
    channels: Array,
    createdAt: { type: Date, default: Date.now }
}))