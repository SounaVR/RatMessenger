// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRoute = require('./Routes/users');

// Instantiate the server
const app = express();
const port = process.env.PORT;

// Database
mongoose
    .connect(process.env.ATLAS_URI)
    .then(() => { console.log('MongoDB connected.') })
    .catch((err) => { console.log(err) });

// Middleware
app.use(express.json());
app.use(cors());
app.use('/users', usersRoute);

// Routes
app.get('/', (req, res) => {
    res.send('Hello API watchers');
});

// Port listening
app.listen(port, (req, res) => {
    console.log(`Server running on port: ${port}`)
});