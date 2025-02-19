import React from 'react';

const CoverImage = ({ imageUrl }) => {
  return (
    <div 
      className="cover-image" 
      style={{ backgroundImage: `url(${imageUrl})` }}
    ></div>
  );
};

export default CoverImage;
