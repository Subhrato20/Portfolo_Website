// GroqChat.js
import React, { useState, useEffect } from 'react';
import { FaRobot, FaTimes, FaChevronUp, FaChevronDown } from 'react-icons/fa';

// Resume data - updated with actual resume content
const resumeText = `Subhrato Som
+1 (215) 240-9510 | subhratosom17@gmail.com | linkedin.com/in/subhratosom | github.com/Subhrato20

EDUCATION
Drexel University - Philadelphia, PA
Master's of Science in Computer Science, GPA: 3.80/4.00, Sep. 2023 – Jun. 2025
Vellore Institute of Technology - Chennai, India
Bachelor's of Degree in Computer Science, GPA: 8.25/10.00, Jul. 2019 – Jun. 2023

EXPERIENCE
Software Engineer (AI Tools Development), Mathtech, Inc., Hamilton, NJ, Jun. 2024 – Dec. 2024
- Built a scalable, cloud-native Retrieval-Augmented Generation (RAG) system on AWS using Flask and Streamlit and participated in roadmapping and architecture discussions to align design with business consulting needs
- Engineered a robust pipeline using S3 for storage, SageMaker for deploying Llamas, and Milvus (EC2) for document storage, embedding, vector search, and context-aware output generation with an LLM, streamlining workflows through text-based query resolution
- Enhanced response performance by 30% using adaptive chunking, BERT-based chunk ranking, and dense embeddings using BAA/lbge-m3
- Implemented automated shutdown of underutilized SageMaker resources based on usage patterns, cutting operational costs by 80%
- Enabled secure user authentication for internal users by integrating AWS Cognito, improving access reliability and streamlining the authorization flow

Software Engineer (Research), Social-NLP Lab, CCI Drexel University, Philadelphia, PA, Feb. 2024 – Present
- Conducted in-depth research on substance abuse memes on Reddit, to identify trends and insights for academic understanding
- Utilized Large Language Models (Llama, GPT) to analyze and interpret textual and visual elements, advancing the field of digital sociology
- Worked on comparative analysis of multiple LLM, focusing on application-specific strengths to derive actionable insights for the research
- Implemented batch API methods for GPT-based inference, significantly improving processing efficiency for large-scale textual datasets

PROJECTS
Voice Agent for Wealth Management (DragonHacks 2025) | Gemini, Function Calling, Retell, FastAPI, Next.js, Apr. 2025
- Developed voice-enabled AI wealth advisor using Gemini 2.5 and Retell SDK to execute real-time stock analysis, personalized recommendations, and auto-trading via conversational bots
- Designed a modular full-stack system with Next.js dashboards for dynamic portfolio tracking, transaction history, and user-specific insights

GPT Operator Agent for Phone Devices (Bitcamp 2025) | Gemini, Function Calling, Pydantic, Kotlin, WebSockets, Apr. 2025
- Built a native Android agent that automates US tasking using Gemini 2.5 and robust session state via MediaProjection API
- Engineered a grid-based coordinate tracker integrated with multimodal prompts, session state management, and dynamic UI automation using Pydantic schemas and OpenAI-style function calling with Gemini 2.5 Pro
- Achieved sub-5s latency with bidirectional WebSocket communication and full local execution

AI-Powered Visual Style Pipeline (HooHacks 2025 Win) | Gemini, GAN, Serp API, Flask, React Native, AWS, Mar. 2025
- Built an image transformation pipeline with recommendations and AI-designed clothes based on user's outfit using Gemini 2.0 Flash Experimental
- Implemented reverse image search with Serp API and used Gemini 2.5 Pro to extract genuine product details like name, price, store, and etc
- Engineered a Creator-Discriminator architecture inspired by GANs to generate diverse, style-aligned concept shoes

RAG-Based AI Agent for Xfinity Services (Codefest 2025 Win) | Milvus, Claude, Perplexity, Firecrawl, Flask, React.js, EC2, Mar. 2025
- Built an end-to-end AI agent to help users identify Xfinity services and bundled needs based on their persona and prompt
- Implemented Retrieval-Augmented Generation (RAG) using Milvus as a Vector DB with webpage scraped via Firecrawl
- Integrated Serp API for efficient responses and Perplexity to automate competitive product research, boosting insight accuracy by 40%

Test-Driven Snake Game using Design Patterns | Java, MVC, TDD, Mutation Testing, Static Analysis, Feb. 2025
- Java-based 2D Snake Game using MVC and design patterns (Factory, Adapter, Strategy), reaching 76% mutation coverage through JUnit, Mockito, and Cucumber tests and ensured clean architecture and error critical issues through SOLID and static analysis

Finance Risk Analytics Platform (Codefest 2024 Win) | Flask, PyTorch, AutoEncoders, EC2, Apr. 2024
- Developed a risk analysis platform using Poisson Distribution, Autoencoder and Logistic Regression in PyTorch, achieving 89% accuracy to predict financial damages from natural disasters
- Designed an interactive UI in Flask and deployed a responsive Flask app on AWS EC2 for seamless user experience

Alzheimer's Classification using OASIS Dataset | Python, CNN, Custom-LDA, PCA, Canny Edge Detection, Nov. 2023 – Dec. 2023
- Designed custom Logistic Regression, LDA, and CNN models built from scratch for MRI analysis, achieving 86% ensemble accuracy
- Processed 80K+ medical images by applying Canny edge detection, Gaussian blur and PCA enhancing feature extraction accuracy by 20%

Chest X-ray Classification and Captioning | Tensorflow, CNN, LSTM, Transformers, Jan. 2023 – Apr. 2023
- Built encoder-decoder models with TensorFlow, boosting chest X-ray disease classification and captioning accuracy to 86%
- Leveraged CNNs (VGG16-ResNet) for feature extraction, followed by LSTMs and Transformers to capture global context

TECHNICAL SKILLS
Languages: Python, Java, JavaScript, Matlab, Swift, Julia, Rust, C, C++
Cloud & DevOps: AWS (EC2, SageMaker, Lambda, Glue, ECR, GCP, NGINX, Docker, Jenkins, Kubernetes, Terraform, Pulumi)
Web: HTML, CSS, React.js, Vue.js, Node.js, Express.js, Angular, Flask, Django, FastAPI, Streamlit
Machine Learning: scikit-learn, TensorFlow, PyTorch, CUDA, CLang, LlamaIndex, LlamaIndex, faiss, HuggingFace
Database: MySQL, PostgreSQL, MongoDB, SQLite, DynamoDB, Milvus, Qdrant, Pinecone

ACHIEVEMENT
Google Gemini Grand Winner, HooHacks 2025
Best AI Agent, Codefest 2025
Bitcamp 2025 Operator Agent Winner
`;

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
      // Use the .NET API
      const res = await fetch('https://localhost:7000/api/groq', {
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
