// GroqChat.js
import React, { useState, useEffect } from 'react';
import { FaRobot, FaTimes, FaChevronUp, FaChevronDown } from 'react-icons/fa';

const GroqChat = () => {
  const [userMessage, setUserMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const chatElement = document.querySelector('.notion-ai-chat-container');
      if (chatElement && !chatElement.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;
    
    // Add user message to chat history
    setChatHistory([...chatHistory, { type: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:5000/api/groq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      let responseText = data.error ? `Error: ${data.error}` : data.response;
      
      // Add AI response to chat history
      setChatHistory([...chatHistory,
        { type: 'user', content: userMessage },
        { type: 'ai', content: responseText }
      ]);
      setResponse(responseText);
    } catch (error) {
      const errorMessage = 'Error occurred while fetching the response.';
      setChatHistory([...chatHistory,
        { type: 'user', content: userMessage },
        { type: 'ai', content: errorMessage }
      ]);
      setResponse(errorMessage);
      console.error(error);
    }

    setUserMessage("");
    setLoading(false);
  };

  // Toggle chat open/closed
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsExpanded(false);
    }
  };

  // Toggle expanded/collapsed view
  const toggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Chat button (always visible) */}
      <button
        className="notion-ai-chat-button"
        onClick={toggleChat}
        aria-label="Chat with AI"
      >
        <FaRobot />
      </button>

      {/* Chat container (visible when open) */}
      {isOpen && (
        <div className={`notion-ai-chat-container ${isExpanded ? 'expanded' : ''}`}>
          <div className="notion-ai-chat-header">
            <div className="notion-ai-chat-title">
              <FaRobot className="notion-ai-icon" />
              <span>AI Assistant</span>
            </div>
            <div className="notion-ai-chat-controls">
              <button onClick={toggleExpand} className="notion-ai-expand-button">
                {isExpanded ? <FaChevronDown /> : <FaChevronUp />}
              </button>
              <button onClick={toggleChat} className="notion-ai-close-button">
                <FaTimes />
              </button>
            </div>
          </div>
          
          <div className="notion-ai-chat-messages">
            {chatHistory.length === 0 ? (
              <div className="notion-ai-empty-state">
                <p>Ask me anything about the portfolio...</p>
              </div>
            ) : (
              chatHistory.map((message, index) => (
                <div key={index} className={`notion-ai-message ${message.type}`}>
                  <div className="notion-ai-message-content">
                    {message.content}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="notion-ai-message ai">
                <div className="notion-ai-message-content">
                  <div className="notion-ai-loading">Thinking...</div>
                </div>
              </div>
            )}
          </div>
          
          <form className="notion-ai-chat-form" onSubmit={handleSubmit}>
            <textarea
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Ask me anything..."
              rows="1"
              className="notion-ai-input"
            />
            <button
              type="submit"
              disabled={loading || !userMessage.trim()}
              className="notion-ai-send-button"
            >
              {loading ? 'Generating...' : 'Send'}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default GroqChat;
