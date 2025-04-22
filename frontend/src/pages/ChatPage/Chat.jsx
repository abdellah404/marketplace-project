import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import usePusher from 'react-pusher';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import Pusher from 'pusher-js';
const Chat = () => {
    const { receiverId } = useParams();
  const _receiverId = Number(receiverId);
  const { user, token } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    // Initialize Pusher
    const pusher = new Pusher('0165e1986359f4b121b9', {
        cluster: 'eu',
        forceTLS: true,
        authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
        auth: {
            headers: {
                Accept: 'application/json', // Tell Laravel to return JSON responses
                Authorization: `Bearer ${token}`
            }
        }
    });

    // Fetch messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/chat/messages/${_receiverId}` , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [_receiverId]);

    useEffect(() => {
        if (!pusher || !user) return;
    
        const channel = pusher.subscribe(`private-chat.${user.id}`);
    
        channel.bind('new-message', (data) => {
            setMessages(prev => [...prev, data.message]);
            scrollToBottom();
            
           
        });
    
        return () => {
            channel.unbind('new-message');
            pusher.unsubscribe(`private-chat.${user.id}`);
        };
    }, [pusher, receiverId, user]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    



    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const response = await axios.post('http://localhost:8000/api/chat/send', {
                receiver_id: _receiverId,
                message: newMessage
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMessages(prev => [...prev, response.data]);
            setNewMessage('');
            scrollToBottom();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <button onClick={() => navigate(-1)} className="btn btn-sm btn-outline-secondary">
                    Back
                </button>
                <h4>Chat with User #{_receiverId}</h4>
            </div>

            <div className="messages-container">
                {messages.map((message) => (
                    <div 
                        key={message.id} 
                        className={`message ${message.sender_id === user.id ? 'sent' : 'received'}`}
                    >
                        <div className="message-content">
                            <p>{message.message}</p>
                            <small className="message-time">
                                {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </small>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="message-form">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="form-control"
                />
                <button type="submit" className="btn btn-primary">
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;