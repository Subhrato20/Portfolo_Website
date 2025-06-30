import React from 'react';
import CoverImage from './CoverImage';
import { achievementsData, aboutData } from '../data/portfolioData';

const Achievements = () => {
  return (
    <div className="achievements-page notion-style-page">
      
      {/* Show the cover image */}
      <CoverImage imageUrl={aboutData.cover_image_url} />
      
      <h2>Achievements</h2>
      {achievementsData.map((achievement, index) => (
        <div className="notion-block" key={index}>
          <h3>{achievement.title}</h3>
          <p>{achievement.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Achievements;