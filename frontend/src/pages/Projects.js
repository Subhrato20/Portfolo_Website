import React, { useEffect, useState } from 'react';
import CoverImage from './CoverImage'; // Import the CoverImage component

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [coverImageUrl, setCoverImageUrl] = useState(null); // State for cover image

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => console.error(err));

    // Fetch the cover image from the same API as About
    fetch('http://127.0.0.1:5000/api/about')
      .then((res) => res.json())
      .then((data) => {
        setCoverImageUrl(data.cover_image_url);
      })
      .catch((err) => console.error(err));

  }, []);

  return (
    <div className="projects-page notion-style-page">
      {/* Show the cover image */}
      {coverImageUrl && <CoverImage imageUrl={coverImageUrl} />}

      <h2>Projects</h2>
      {projects.map((project, index) => (
        <div className="notion-block" key={index}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer">
              View Project
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default Projects;
