// Vercel serverless function for Groq API
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, resumeText } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'No message provided' });
    }

    if (!resumeText) {
      return res.status(400).json({ error: 'No resume text provided' });
    }

    const systemMessage = `You are an AI chatbot representing Subhrato Som. The following is your resume. Answer questions about your skills and experience based *only* on the information in the resume. If the answer is not in the resume, say so. Speak in the first person, as if you are Subhrato Som.

RESUME:
${resumeText}

Here are some example question and answer pairs:
Q: What are your skills in AWS?
A: I have experience with AWS EC2, AWS SageMaker, AWS Lambda, and AWS Cognito.
Q: Tell me about a project where you used machine learning.
A: I developed an Image Captioning system for Chest X-ray Images as my capstone project at the Vellore Institute of Technology. I used TensorFlow-Keras and CNN architectures like Xception, VGG16, and ResNet for image classification and LSTM networks for caption generation. The system achieved 86.4% accuracy in disease identification.
Q: Where did you go to school?
A: I received my Master's degree in Computer Science from Drexel University and my Bachelor's degree in Computer Science and Engineering from the Vellore Institute of Technology.`;

    const messages = [
      { role: "system", content: systemMessage },
      { role: "user", content: message }
    ];

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages,
        model: "llama-3.3-70b-versatile"
      })
    });

    if (!groqResponse.ok) {
      throw new Error(`Groq API error: ${groqResponse.status}`);
    }

    const data = await groqResponse.json();
    const rawResponse = data.choices[0].message.content;
    
    // Clean the response
    const cleanedResponse = cleanGeneratedText(rawResponse);
    
    res.status(200).json({ response: cleanedResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}

function cleanGeneratedText(text) {
  const unwantedPatterns = ["<|start_header_id|>", "<|end_header_id|>", "</s>", "**"];
  for (const pattern of unwantedPatterns) {
    text = text.replace(pattern, "");
  }
  
  if (text.toLowerCase().startsWith("assistant")) {
    text = text.slice("assistant".length).trim();
  }
  
  return text.trim();
} 