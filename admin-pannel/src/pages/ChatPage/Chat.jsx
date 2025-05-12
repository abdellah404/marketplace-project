import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import Pusher from 'pusher-js';

const Chat = () => {
  const { receiverId } = useParams();
  const _receiverId = Number(receiverId);
  const { user, token } = useAuth();
  const { isDarkMode } = useSelector((state) => state.theme);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Set header background: black in light mode, purple in dark mode
  const headerBg = isDarkMode ? 'purple' : 'black';

  // Initialize Pusher
  const pusher = new Pusher('0165e1986359b4b121b9', {
    cluster: 'eu',
    forceTLS: true,
    authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
    auth: {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  });

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/chat/messages/${_receiverId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [newMessage]);

  // Listen for new messages via Pusher
  useEffect(() => {
    if (!pusher || !user) return;
    const channel = pusher.subscribe(`private-chat.${user.id}`);
    channel.bind('new-message', (data) => {
      setMessages((prev) => [...prev, data.message]);
      scrollToBottom();
    });
    return () => {
      channel.unbind('new-message');
      pusher.unsubscribe(`private-chat.${user.id}`);
    };
  }, [pusher, user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(
        'http://localhost:8000/api/chat/send',
        {
          receiver_id: _receiverId,
          message: newMessage,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) => [...prev, response.data]);
      setNewMessage('');
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: '600px' }}>
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div
              className="card-header text-white d-flex justify-content-between align-items-center py-3"
              style={{ backgroundColor: headerBg }}
            >
              <button 
                onClick={() => navigate(-1)}
                className="btn btn-sm btn-outline-light rounded-circle"
                style={{ width: '32px', height: '32px' }}
              >
                <i className="bi bi-arrow-left"></i>
              </button>
              <h5 className="mb-0 fw-bold">Chat</h5>
              <div style={{ width: '32px' }}></div>
            </div>
            
            <div 
              className="card-body p-0" 
              style={{ 
                height: '400px', // reduced height for container
                overflowY: 'auto',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)'
              }}
            >
              <div className="p-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-3 d-flex ${message.sender_id === user.id ? 'justify-content-end' : 'justify-content-start'}`}
                  >
                    <div
                      className={`px-3 py-2 rounded-3 position-relative ${message.sender_id === user.id ? 'text-white' : 'bg-white text-dark border'}`}
                      style={{
                        maxWidth: '75%',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        ...( message.sender_id === user.id && { backgroundColor: isDarkMode ? 'purple' : 'black' } )
                      }}
                    >
                      <p className="mb-1">{message.message}</p>
                      <small 
                        className={`d-block text-end ${message.sender_id === user.id ? 'text-white-50' : 'text-muted'}`}
                        style={{ fontSize: '0.7rem' }}
                      >
                        {new Date(message.created_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </small>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            <div className="card-footer bg-white border-top-0 pt-0">
              <form onSubmit={sendMessage} className="d-flex align-items-center gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="form-control rounded-pill border-0 bg-light"
                  style={{
                    boxShadow: 'none',
                    padding: '10px 20px',
                    flex: 1
                  }}
                />
                <button 
                  type="submit" 
                  className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '45px',
                    height: '45px'
                  }}
                >
                  <i className="bi bi-send-fill"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;