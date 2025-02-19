import React, { useEffect, useState } from 'react';
import CoverImage from './CoverImage'; // Import the CoverImage component

const About = () => {
  const [about, setAbout] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch About Data
    fetch('http://127.0.0.1:5000/api/about')
      .then((res) => res.json())
      .then((data) => {
        setAbout(data);
      })
      .catch((err) => console.error(err));

    // Fetch Projects Data
    fetch('http://127.0.0.1:5000/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!about) {
    return <div>Loading...</div>;
  }

  return (
    <div className="about-page notion-style-page">
      {/* Cover Image */}
      <CoverImage imageUrl={about.cover_image_url} />

      {/* About Section */}
      <h1 className="about-name">{about.name}</h1>
      <p className="about-description">{about.description}</p>

      {/* Projects Section */}
      <h2 className="projects-heading">Projects</h2>
      <div className="notion-table">
        {/* Table Header */}
        <div className="notion-table-header">
          <div className="notion-table-cell title">Title</div>
          <div className="notion-table-divider"></div>
          <div className="notion-table-cell description">Description</div>
        </div>

        {/* Table Rows */}
        {projects.map((project, index) => (
          <div className="notion-table-row" key={index}>
            <div className="notion-table-cell title">
              <strong>{project.title}</strong>
            </div>
            <div className="notion-table-divider"></div>
            <div className="notion-table-cell description">{project.description}</div>
          </div>
        ))}

        {/* New Page Placeholder (Optional) */}
        <div className="notion-table-row new-page">
          <div className="notion-table-cell" colSpan="2">+ New page</div>
        </div>
      </div>
    </div>
  );
};

export default About;
