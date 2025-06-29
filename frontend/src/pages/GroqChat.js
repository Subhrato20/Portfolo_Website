// GroqChat.js
import React, { useState, useEffect } from 'react';
import { FaRobot, FaTimes, FaChevronUp, FaChevronDown } from 'react-icons/fa';

// Resume data - you can move this to a separate file if needed
const resumeText = `Subhrato Som
Master's in Computer Science | Drexel University
Bachelor's in Computer Science and Engineering | Vellore Institute of Technology

SKILLS:
Programming Languages: Python, Java, JavaScript, C++, SQL
Frameworks & Libraries: React, Node.js, TensorFlow, Keras, PyTorch, Django, Flask
Cloud & DevOps: AWS (EC2, SageMaker, Lambda, Cognito), Docker, Git, CI/CD
Databases: MySQL, PostgreSQL, MongoDB, Redis
Tools & Platforms: Jupyter Notebook, VS Code, PyCharm, Eclipse

EXPERIENCE:
Software Engineer Intern | Company A | 2023-2024
- Developed and maintained web applications using React and Node.js
- Implemented RESTful APIs and database integrations
- Collaborated with cross-functional teams on agile development

Machine Learning Research Assistant | Vellore Institute of Technology | 2022-2023
- Conducted research on computer vision and natural language processing
- Published papers on advanced algorithms in prestigious journals
- Achieved 86.4% accuracy in disease identification using CNN architectures

PROJECTS:
Image Captioning System for Chest X-ray Images | Capstone Project
- Developed an AI system using TensorFlow-Keras and CNN architectures (Xception, VGG16, ResNet)
- Implemented LSTM networks for caption generation
- Achieved 86.4% accuracy in disease identification
- Technologies: Python, TensorFlow, Keras, OpenCV, NumPy

E-commerce Platform | Full-Stack Development
- Built a complete e-commerce solution with React frontend and Node.js backend
- Integrated payment gateways and inventory management
- Implemented user authentication and authorization
- Technologies: React, Node.js, MongoDB, Express.js, JWT

ACHIEVEMENTS:
- Won first place in hackathon competition with innovative AI solution
- Published research paper on advanced algorithms in prestigious journal
- Received recognition for outstanding performance in project delivery
- Dean's List recipient at Drexel University`;

const GroqChat = () => {
  const [userMessage, setUserMessage] = useState("");
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
      // Use the serverless function
      const res = await fetch('/api/groq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage,
          resumeText: resumeText 
        }),
      });

      const data = await res.json();
      let responseText = data.error ? `Error: ${data.error}` : data.response;
      
      // Add AI response to chat history
      setChatHistory([...chatHistory,
        { type: 'user', content: userMessage },
        { type: 'ai', content: responseText }
      ]);
    } catch (error) {
      const errorMessage = 'Error occurred while fetching the response.';
      setChatHistory([...chatHistory,
        { type: 'user', content: userMessage },
        { type: 'ai', content: errorMessage }
      ]);
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
