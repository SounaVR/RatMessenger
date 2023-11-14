// Imports
const express = require('express');
const { registration, authentication, findUser } = require('../Controllers/users');

const router = express.Router();

// Routes
router.post('/register', registration);
router.post('/login', authentication);
router.get('/find/:userID', findUser);

module.exports = router;