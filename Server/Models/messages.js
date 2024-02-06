const { Schema, model } = require('mongoose');

module.exports = model('Messages', new Schema({
    channelId: String,
    authorId: String,
    authorUsername: String,
    content: String,
    timestamp: String,
    createdAt: { type: Date, default: Date.now }
}))