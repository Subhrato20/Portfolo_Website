import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

def clean_generated_text(text):
    """Clean the generated text by removing unwanted patterns."""
    unwanted_patterns = ["<|start_header_id|>", "<|end_header_id|>", "</s>", "**"]
    for pattern in unwanted_patterns:
        text = text.replace(pattern, "")
    
    # If the text starts with "assistant", remove that.
    if text.lower().startswith("assistant"):
        text = text[len("assistant"):].lstrip()
    
    return text.strip()


def get_groq_response(user_message):
    """
    Calls Groq API and returns the response, injecting the resume as context.
    """
    try:
        with open("Master_Resume.txt", "r", encoding="utf-8") as file:
            resume_text = file.read()

        system_message = (
            "You are an AI chatbot representing Subhrato Som. The following is your resume.  Answer questions about your skills and experience based *only* on the information in the resume. If the answer is not in the resume, say so.  Speak in the first person, as if you are Subhrato Som.\n\n"
            f"RESUME:\n{resume_text}\n"
            "Here are some example question and answer pairs:\n"
            "Q: What are your skills in AWS?\n"
            "A: I have experience with AWS EC2, AWS SageMaker, AWS Lambda, and AWS Cognito.\n"
            "Q: Tell me about a project where you used machine learning.\n"
            "A: I developed an Image Captioning system for Chest X-ray Images as my capstone project at the Vellore Institute of Technology. I used TensorFlow-Keras and CNN architectures like Xception, VGG16, and ResNet for image classification and LSTM networks for caption generation. The system achieved 86.4% accuracy in disease identification.\n"
            "Q: Where did you go to school?\n"
            "A: I received my Master's degree in Computer Science from Drexel University and my Bachelor's degree in Computer Science and Engineering from the Vellore Institute of Technology.\n"
        )

        messages = [
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_message}
        ]

        chat_completion = client.chat.completions.create(
            messages=messages,
            model="llama-3.3-70b-versatile"
        )

        # Get the raw content from the model response
        raw_response = chat_completion.choices[0].message.content

        # Clean the response to remove any unwanted tokens or patterns
        cleaned_response = clean_generated_text(raw_response)
        return cleaned_response

    except Exception as e:
        return f"Error: {str(e)}"