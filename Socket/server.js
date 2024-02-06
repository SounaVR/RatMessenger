require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {cors: {origin: "*"}});

const client = new MongoClient(process.env.ATLAS_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

const activeChannels = {};

app.use(cors());

const createMessageInDatabase = async (channelId, authorId, authorUsername, content) => {
    const db = client.db('RatMessenger');
    const messagesCollection = db.collection('messages');
  
    try {
        const result = await messagesCollection.insertOne({ channelId, authorId, authorUsername, content, createdAt: Date.now() });
        console.log("Result:", result)
  
        if (content) {
            console.log('Message inserted');
            return { authorUsername: authorUsername, content: content };
        } else {
            throw new Error('Error saving message to the database');
        }
    } catch (err) {
        console.error('Error inserting message to the database:', err);
        throw new Error('Error saving message to the database');
    }
};

io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for channel subscription
    socket.on('subscribe', (channel) => {
        // Join the specified channel
        socket.join(channel);

        // Store the user in the activeChannels object
        if (!activeChannels[channel]) {
            activeChannels[channel] = { users: [], messages: [] };
        }

        activeChannels[channel].users.push({ id: socket.id });
    });

    // Listen for messages
    socket.on('chat message', async (msg, channelId) => {
        try {
            // Save the message to the database
            const newMessage = await createMessageInDatabase(channelId, msg.authorId, msg.authorUsername, msg.content);

            // Emit the message to the channel
            io.to(channelId).emit('chat message', newMessage);
        } catch (err) {
            console.error(err);
            // Handle the error appropriately
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');

        // Remove the user from activeChannels
        for (const channel in activeChannels) {
            if (Array.isArray(activeChannels[channel])) {
                activeChannels[channel] = activeChannels[channel].filter((user) => user.id !== socket.id);
            }
        }
    });
});

const PORT = process.env.PORT || 3001;

// Connect to the MongoDB server
client.connect()
    .then(() => {
        console.log('Connected to MongoDB');
        // Start your server after connecting to MongoDB
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => { console.error('Error connecting to MongoDB:', err) });