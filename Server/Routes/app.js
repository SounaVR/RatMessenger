// Imports
const express = require('express');
const { createServer, findUserServers, createChannel, findChannel } = require('../Controllers/servers');
const { createMessage, getMessages } = require('../Controllers/messages');
const { registration, authentication, findUser } = require('../Controllers/users');

const router = express.Router();

// Middleware function to authenticate users
const authenticateUser = (req, res, next) => {
    // Check if the authorization header is present
    const token = req.header('Authorization');

    if (!token) {
        // User is not authenticated, send an unauthorized response
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        next();
    } catch (error) {
        // Token is invalid
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Routes users
router.post('/users/register', registration);
router.post('/users/login', authentication);
router.get('/users/:userID', authenticateUser, findUser);

// Routes servers
router.post('/servers/create', authenticateUser, createServer);
router.get('/servers/:userId', authenticateUser, findUserServers);

// Routes channels
router.post('/servers/channels/create', authenticateUser, createChannel);
router.get('/servers/channels/:serverId', authenticateUser, findChannel);

// Routes messages
router.post('/servers/messages/create', authenticateUser, createMessage);
router.get('/servers/channels/messages/:channelId', authenticateUser, getMessages);

module.exports = router;