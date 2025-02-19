import React, { useEffect, useState } from 'react';
import CoverImage from './CoverImage'; // Import the CoverImage component

const About = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/about')
      .then((res) => res.json())
      .then((data) => {
        setAbout(data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!about) {
    return <div>Loading...</div>;
  }

  return (
    <div className="about-page">
      <CoverImage imageUrl={about.cover_image_url} /> {/* Use CoverImage component */}
      
      <h1 className="about-name">{about.name}</h1>
      <p className="about-description">{about.description}</p>
    </div>
  );
};

export default About;
