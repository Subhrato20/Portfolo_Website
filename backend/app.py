from flask import Flask, jsonify, send_from_directory
import os

app = Flask(
    __name__,
    static_folder='../frontend/build',  # Where React build files will live
    static_url_path='/'
)

print("Absolute path to static_folder:", os.path.abspath(app.static_folder))

@app.route('/')
def serve_react_app():
    """
    Serve the compiled React app (index.html).
    """
    # We'll assume you've built your React app into `../frontend/build`
    return send_from_directory(app.static_folder, 'index.html')

# Example route for "About Me" data
@app.route('/api/about')
def about():
    return jsonify({
        "name": "John Doe",
        "shortBio": "I am a software developer who loves minimalist design and well-crafted user experiences."
    })

@app.route('/api/projects')
def get_projects():
    return jsonify([
        {
            "id": 1,
            "title": "Portfolio Website",
            "description": "Description of your project",
            "link": "https://github.com/yourusername/portfolio"
        },
        {
            "id": 2,
            "title": "Another Cool Project",
            "description": "Short detail about it",
            "link": "https://github.com/yourusername/cool-project"
        }
    ])

@app.route('/api/experience')
def get_experience():
    return jsonify([
        {
            "id": 1,
            "company": "Your Company",
            "role": "Software Engineer",
            "duration": "2022 - Present",
            "description": "Short summary of your role..."
        },
        {
            "id": 2,
            "company": "Other Company",
            "role": "Intern",
            "duration": "2021",
            "description": "Internship responsibilities..."
        }
    ])


@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
