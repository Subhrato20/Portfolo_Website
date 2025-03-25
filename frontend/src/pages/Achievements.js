import React, { useEffect, useState } from 'react';
import CoverImage from './CoverImage'; // Import CoverImage component

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [coverImageUrl, setCoverImageUrl] = useState(null); // State for cover image

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/achievements')
      .then((res) => res.json())
      .then((data) => {
        setAchievements(data);
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
    <div className="achievements-page notion-style-page">
      
      {/* Show the cover image */}
      {coverImageUrl && <CoverImage imageUrl={coverImageUrl} />}
      
      <h2>Achievements</h2>
      {achievements.map((achievement, index) => (
        <div className="notion-block" key={index}>
          <h3>{achievement.title}</h3>
          <p>{achievement.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Achievements;