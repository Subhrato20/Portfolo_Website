// Projects.js
import React, { useEffect, useState } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      {projects.map((project) => (
        <div key={project.id}>
          <h4>{project.title}</h4>
          <p>{project.description}</p>
          <a href={project.link} target="_blank" rel="noreferrer">View Project</a>
        </div>
      ))}
    </div>
  );
};

export default Projects;
