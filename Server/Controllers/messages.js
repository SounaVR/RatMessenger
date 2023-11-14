const model = require('../Models/messages');

const createMessage = async (req, res) => {
    const { channelId, authorId, content } = req.body;

    const message = new model({
        channelId, authorId, content
    });

    try {
        const response = await message.save();

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const getMessages = async (req, res) => {
    const { channelId } = req.params;

    try {
        const messages = await model.find({ channelId });

        res.status(200).json(messages);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

module.exports = { createMessage, getMessages };