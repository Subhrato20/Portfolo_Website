from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS so that our React app can fetch data

about_data = {
    "name": "😁 Subhrato Som",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec sagittis nulla, blandit lacinia mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In sit amet molestie dui. Proin non sollicitudin quam. Sed diam nisl, molestie non placerat et, iaculis faucibus mauris. Fusce consectetur neque eget felis ultrices varius. Etiam ornare ligula non eros accumsan suscipit. Curabitur quis mi ullamcorper diam tempus lacinia. Praesent gravida laoreet diam sit amet suscipit. Suspendisse rhoncus elit ex, at fringilla nisi dictum a. Interdum et malesuada fames ac ante ipsum primis in faucibus. In a augue at turpis rhoncus facilisis et ac nisl. Donec et placerat massa. Duis condimentum ante at sapien auctor lobortis. Nunc gravida sed sem sed imperdiet. Etiam vel accumsan tortor, vitae consectetur urna.",
    "cover_image_url": "https://assets.editorial.aetnd.com/uploads/2010/10/renaissance-art-gettyimages-550119221.jpg" 
    # Replace with your own cover image URL
}

projects_data = [
    {
        "title": "Project One",
        "description": "A brief description of project one.",
        "link": "https://github.com/username/project-one"
    },
    {
        "title": "Project Two",
        "description": "A brief description of project two.",
        "link": "https://github.com/username/project-two"
    }
]

experiences_data = [
    {
        "company": "Company A",
        "role": "Software Engineer",
        "description": "Worked on various cool projects..."
    },
    {
        "company": "Company B",
        "role": "Intern",
        "description": "Learned a ton about web development..."
    }
]

@app.route("/api/about", methods=["GET"])
def get_about():
    return jsonify(about_data)

@app.route("/api/projects", methods=["GET"])
def get_projects():
    return jsonify(projects_data)

@app.route("/api/experiences", methods=["GET"])
def get_experiences():
    return jsonify(experiences_data)

@app.route("/api/groq", methods=["POST"])
def groq_chat():
    user_message = request.json.get("message", "")
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    groq_response = get_groq_response(user_message)
    return jsonify({"response": groq_response})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
