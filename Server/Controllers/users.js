// Imports
const model = require('../Models/users');
const bcrypt= require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

// JWT
const generateToken = (_id) => {
    const key = process.env.JWT_TOKEN;
    return jwt.sign({ _id }, key, { expiresIn: '7d' });
};

// Registration function
const registration = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let user = await model.findOne({ email });

        // Error handler
        if (user) return res.status(400).json('User already exists.');
        if (!username || !email || !password) return res.status(400).json('All fields are required.');
        if (!validator.isEmail(email)) return res.status(400).json('Email must be valid.');
        if (!validator.isStrongPassword(password)) return res.status(400).json('Password must be valid.');

        // Generating the user by the db model
        user = new model({ username, email, password });

        // Password hashing
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Saving the user to the db
        await user.save();

        // Registering the user
        const token = generateToken(user._id);
        res.status(200).json({ _id: user._id, username, email, token });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

// Authentication function
const authentication = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await model.findOne({ email });

        // Error handler
        if (!user) return res.status(400).json('Invalid credentials.');

        // Check the password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(400).json('Invalid credentials.');
        
        // Logging the user
        const token = generateToken(user._id);
        res.status(200).json({ _id: user._id, username: user.username, email, token });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

// Find user
const findUser = async (req, res) => {
    const id = req.params.userID;
    try {
        const user = await model.findById(id);

        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

module.exports = { registration, authentication, findUser };