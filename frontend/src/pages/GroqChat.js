import React, { useState } from 'react';

const GroqChat = () => {
  const [userMessage, setUserMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      if (data.error) {
        setResponse(`Error: ${data.error}`);
      } else {
        setResponse(data.response);
      }
    } catch (error) {
      setResponse('Error occurred while fetching the response.');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="groq-chat-container">
      <h2>Chat with Groq</h2>
      <form onSubmit={handleSubmit} className="groq-chat-form">
        <textarea
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your question about the resume..."
          className="groq-chat-textarea"
        />
        <button type="submit" disabled={loading} className="groq-chat-button">
          {loading ? 'Generating...' : 'Send'}
        </button>
      </form>

      {response && (
        <div className="groq-chat-response">
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default GroqChat;
