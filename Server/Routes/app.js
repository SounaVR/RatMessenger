// Imports
const express = require('express');
const { createServer, findUserServers, createChannel, findChannel } = require('../Controllers/servers');
const { createMessage, getMessages } = require('../Controllers/messages');
const { registration, authentication, findUser } = require('../Controllers/users');

// Routes
const router = express.Router();

// Routes users
router.post('/users/register', registration);
router.post('/users/login', authentication);
router.get('/users/:userID', findUser);

// Routes servers
router.post('/servers/create', createServer);
router.get('/servers/:userId', findUserServers);

// Routes channels
router.post('/servers/channels/create', createChannel);
router.get('/servers/channels/:serverId', findChannel);

// Routes messages
router.post('/servers/messages/create', createMessage);
router.get('/servers/channels/messages/:channelId', getMessages);

module.exports = router;