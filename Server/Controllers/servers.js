const mongoose = require('mongoose');
const model = require('../Models/servers');

const createServer = async (req, res) => {
    const { serverName, userId } = req.body;

    try {
        const newObjectID = new mongoose.Types.ObjectId();
        const newObjectID2 = new mongoose.Types.ObjectId();
        let server = await model.findOne({ serverName });

        if (server) return res.status(200).json(server);

        const newServer = new model({
            name: serverName,
            members: [userId],
            channels: [{
                _id: newObjectID,
                name: "General",
                type: "Text",
                createdAt: Date.now()
            },
            {
                _id : newObjectID2,
                name: "General",
                type: "Voice",
                createdAt: Date.now()
            }]
        });

        const response = await newServer.save();

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const findUserServers = async (req, res) => {
    const userId = req.params.userId;

    try {
        const servers = await model.find({
            members: { $in: [userId] }
        });

        res.status(200).json(servers);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

module.exports = { createServer, findUserServers };