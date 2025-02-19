import React, { useEffect, useState } from 'react';
import CoverImage from './CoverImage'; // Import CoverImage component

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [coverImageUrl, setCoverImageUrl] = useState(null); // State for cover image

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/experiences')
      .then((res) => res.json())
      .then((data) => {
        setExperiences(data);
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
    <div className="experiences-page notion-style-page">
      
      {/* Show the cover image */}
      {coverImageUrl && <CoverImage imageUrl={coverImageUrl} />}
      
      <h2>Experiences</h2>
      {experiences.map((exp, index) => (
        <div className="notion-block" key={index}>
          <h3>{exp.role} @ {exp.company}</h3>
          <p>{exp.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Experiences;
