// Chat.js
import React, { useRef, useState, useEffect, useContext } from 'react';
import { Auth } from '../Context/Auth';
import { io } from 'socket.io-client';
import { baseUrl, getRequest } from '../Utils/Services';
import moment from 'moment';
import pfp from '../Assets/avatar.jpg';

const Chat = ({ activeChannel }) => {
    const { user } = useContext(Auth);

    const messageListRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);

    const getFormattedTimestamp = (timestamp) => {
        const now = moment();
        const messageTime = moment(timestamp);
    
        if (now.isSame(messageTime, 'day')) {
            return messageTime.format('[Today at] h:mm A');
        } else if (now.subtract(1, 'days').isSame(messageTime, 'day')) {
            return messageTime.format('[Yesterday at] h:mm A');
        } else {
            return messageTime.format('MM/DD/YYYY h:mm A');
        }
    };

    // Function to handle message input and sending
    const handleMessageSubmit = () => {
        // If the new message is empty, we return nothing
        if (newMessage.trim() === '') return;

        // Create a new message object with content and timestamp
        const message = {
            authorId: user._id,
            authorUsername: user.username,
            content: newMessage
        };

        // Emit the message to the server
        socket.emit('chat message', message, activeChannel);

        // Clear the message input field
        setNewMessage('');
    };

    // Effect to listen for incoming messages from the server
    useEffect(() => {
        // Connect to the WebSocket server
        const newSocket = io('http://localhost:3001');
        setSocket(newSocket);

        newSocket.emit('subscribe', activeChannel);

        // Listen for incoming messages
        newSocket.on('chat message', (message) => {
            setMessages((prevMessages) => [message, ...prevMessages]);
        });

        // Fetch chat history from the server
        const fetchChatHistory = async () => {
            try {
                const response = await getRequest(`${baseUrl}/app/servers/channels/messages/${activeChannel}`, user.token);
                setMessages(response);
            } catch (error) {
                console.error('Error fetching chat history:', error);
            }
        };

        // Load chat history when the component mounts
        fetchChatHistory();

        return () => {
            // Disconnect when the component unmounts
            newSocket.disconnect();
        };
    }, [activeChannel]);

    // Effect to scroll to the bottom when new messages are received
    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="chat">
            { activeChannel ? (
                <>
                    <h2>{activeChannel}</h2>
                    <div className="message-list"  ref={messageListRef}>
                        {messages.map((message, index) => (
                            <div key={index} className="message">
                                <div className="message-container">
                                    <img src={pfp} alt="Profile" className="profile-picture" />
                                    <div className='message-sender-timestamp'>
                                        <div className="message-sender">{message.authorUsername}</div>
                                        <div className="message-timestamp">{getFormattedTimestamp(message.createdAt)}</div>
                                    </div>
                                </div>
                                <div className="message-content">{message.content}</div>
                            </div>
                        ))}
                    </div>
                    <div className="message-input">
                        <input
                        autoFocus
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && newMessage.trim() !== '') {
                                handleMessageSubmit();
                            }
                        }}
                        />
                        <button onClick={handleMessageSubmit}>Send</button>
                    </div>
                </>
            ) : (
                <p>Select a channel to start chatting</p>
            )}
        </div>
    );
};

export default Chat;