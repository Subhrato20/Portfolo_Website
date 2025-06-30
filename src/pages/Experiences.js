import React from 'react';
import CoverImage from './CoverImage';
import { experiencesData, aboutData } from '../data/portfolioData';

const Experiences = () => {
  return (
    <div className="experiences-page notion-style-page">
      
      {/* Show the cover image */}
      <CoverImage imageUrl={aboutData.cover_image_url} />
      
      <h2>Experiences</h2>
      {experiencesData.map((exp, index) => (
        <div className="notion-block" key={index}>
          <h3>{exp.role} @ {exp.company}</h3>
          <p>{exp.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Experiences;
