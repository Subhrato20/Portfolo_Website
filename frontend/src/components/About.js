import React, { useEffect, useState } from 'react';

const About = () => {
  const [aboutData, setAboutData] = useState({});

  useEffect(() => {
    fetch('/api/about')
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="page-section">
      <h2>About Me</h2>
      <h3>{aboutData.name}</h3>
      <p>{aboutData.shortBio}</p>
    </div>
  );
};

export default About;
