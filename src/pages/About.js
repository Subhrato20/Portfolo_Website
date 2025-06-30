// src/pages/About.js
import React from 'react';
import CoverImage from './CoverImage';
import { aboutData, projectsData } from '../data/portfolioData';

const About = () => {
  return (
    <div className="about-page notion-style-page">
      {/* Cover Image */}
      <CoverImage imageUrl={aboutData.cover_image_url} />

      {/* About Section */}
      <h1 className="about-name">{aboutData.name}</h1>
      <p className="about-description">{aboutData.description}</p>

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
        {projectsData.map((project, index) => (
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
          <div className="notion-table-cell" colSpan="2">
            + New page
          </div>
        </div>
      </div>

      {/* Removed Groq Chat Section as it's now global in App.js */}
    </div>
  );
};

export default About;
