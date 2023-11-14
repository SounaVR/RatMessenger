const { Schema, model } = require('mongoose');

module.exports = model('Messages', new Schema({
    channelId: String,
    authorId: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
}))