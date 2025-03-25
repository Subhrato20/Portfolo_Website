import React, { useState, useEffect } from 'react';

const CoverImage = () => {
  const text = "Hey There, I am Subhrato Som";
  const [visibleText, setVisibleText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setVisibleText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 50); // Adjust delay as needed

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <div className="cover-image" style={{ backgroundColor: 'black', color: 'white', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2em' }}>
      <span>{visibleText}</span>
    </div>
  );
};

export default CoverImage;
