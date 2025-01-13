import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../state/UserContext';
import { sendMessageToOpenAI } from '../utils/openAiUtils';

const AiAssistantChat: React.FC = () => {
  const { userData } = useUserContext();
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: 'AI', text: 'Hi there! How can I assist you today?' },
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendMessage = async () => {
    if (userMessage.trim()) {
      // Add the user's message to the chat
      setMessages((prev) => [...prev, { sender: 'User', text: userMessage }]);
      setIsLoading(true);

      try {
        const aiResponse = await sendMessageToOpenAI([
          { role: 'system', content: 'You are a fitness assistant for Hashfit, focusing on workout advice, nutrition, and fitness support.' },
          ...messages.map((msg) => ({
            role: msg.sender.toLowerCase() === 'user' ? 'user' : 'assistant',
            content: msg.text,
          })),
          { role: 'user', content: userMessage },
        ]);

        setMessages((prev) => [...prev, { sender: 'AI', text: aiResponse }]);
      } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        setMessages((prev) => [
          ...prev,
          { sender: 'AI', text: 'Sorry, I encountered an error. Please try again later.' },
        ]);
      } finally {
        setIsLoading(false);
        setUserMessage('');
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '60%', height: '800px', fontFamily: 'Raleway, sans-serif', paddingLeft: '700px' }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: '#B00020',
          color: 'white',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '1.2rem',
            marginRight: '20px',
            cursor: 'pointer',
          }}
        >
          ←
        </button>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>AI Assistant Chat</h1>
      </header>

      {/* Chat Window */}
      <div
        style={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#f9f9f9',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              marginBottom: '10px',
              alignSelf: message.sender === 'User' ? 'flex-end' : 'flex-start',
              maxWidth: '70%',
              backgroundColor: message.sender === 'User' ? '#fdecea' : '#ddd',
              color: message.sender === 'User' ? '#B00020' : '#000',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div
            style={{
              marginBottom: '10px',
              alignSelf: 'flex-start',
              maxWidth: '70%',
              backgroundColor: '#ddd',
              color: '#000',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            Thinking...
          </div>
        )}
      </div>

      {/* Input Section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 20px',
          borderTop: '1px solid #ddd',
          backgroundColor: '#fff',
        }}
      >
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '1rem',
            marginRight: '10px',
            backgroundColor: 'white',
            color: 'black',
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          style={{
            backgroundColor: '#B00020',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AiAssistantChat;

