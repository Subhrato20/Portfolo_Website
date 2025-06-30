import React from 'react';
import CoverImage from './CoverImage'; // Import the CoverImage component
import { projectsData, aboutData } from '../data/portfolioData';

const Projects = () => {
  return (
    <div className="projects-page notion-style-page">
      {/* Show the cover image */}
      <CoverImage imageUrl={aboutData.cover_image_url} />

      <h2>Projects</h2>
      {projectsData.map((project, index) => (
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
