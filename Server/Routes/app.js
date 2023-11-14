// Imports
const express = require('express');
const { createServer, findUserServers } = require('../Controllers/servers');
const { createMessage, getMessages } = require('../Controllers/messages');
const { registration, authentication, findUser } = require('../Controllers/users');

// Routes
const router = express.Router();

// Routes users
router.post('/users/register', registration);
router.post('/users/login', authentication);
router.get('/users/find/:userID', findUser);

// Routes servers
router.post('/servers/create', createServer);
router.get('/servers/find/:userId', findUserServers);

// Routes messages
router.post('/messages/create', createMessage);
router.get('/messages/:channelId', getMessages);

module.exports = router;