const model = require('../Models/messages');

const Joi = require('joi');

const createMessage = async (req, res) => {
    const { channelId, authorId, content } = req.body;

    // Define a schema for validation
    const schema = Joi.object({
        channelId: Joi.string().required(),
        authorId: Joi.string().required(),
        content: Joi.string().required(),
    });

    try {
        // Validate the request data
        await schema.validateAsync({ channelId, authorId, content });

        // Create a new message
        const message = new model({
            channelId, authorId, content
        });

        // Save the message to the database
        const response = await message.save();

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Invalid data' });
    }
};

const getMessages = async (req, res) => {
    const { channelId } = req.params;

    try {
        const messages = await model.find({ channelId: channelId })
            .sort({ createdAt: -1 })

        if (!messages) {
            res.status(200).json([]);
        } else {
            res.status(200).json(messages);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createMessage, getMessages };