import os
from groq import Groq

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

def get_groq_response(user_message):
    """
    Calls Groq API and returns the response.
    """
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message}
            ],
            model="llama-3.3-70b-versatile"
        )
        return chat_completion.choices[0].message.content

    except Exception as e:
        return f"Error: {str(e)}"
