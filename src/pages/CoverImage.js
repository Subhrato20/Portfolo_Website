import React, { useEffect, useState } from 'react';
import figlet from 'figlet';

const CoverImage = () => {
  const rawText = "Hey There, I am Subhrato Som";
  const [asciiArt, setAsciiArt] = useState('');
  const [visibleText, setVisibleText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fontSize, setFontSize] = useState('1em');

  // Load Figlet font and convert text to ASCII
  useEffect(() => {
    fetch('/fonts/ANSI Shadow.flf')
      .then((res) => res.text())
      .then((fontData) => {
        figlet.parseFont('ANSI Shadow', fontData);
        figlet.text(rawText, { font: 'ANSI Shadow' }, (err, data) => {
          if (!err && data) {
            setAsciiArt(data);
          } else {
            console.error('Figlet error:', err);
          }
        });
      });
  }, []);

  // Animate the ASCII text appearance
  useEffect(() => {
    if (asciiArt && currentIndex < asciiArt.length) {
      const timeout = setTimeout(() => {
        setVisibleText((prev) => prev + asciiArt[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 2);
      return () => clearTimeout(timeout);
    }
  }, [asciiArt, currentIndex]);

  // Responsive font size adjustment
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 500) {
        setFontSize('0.3em');
      } else if (width < 768) {
        setFontSize('0.5em');
      } else {
        setFontSize('0.75em');
      }
    };

    handleResize(); // initial set
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="cover-image"
      style={{
        backgroundColor: 'black',
        color: 'orange',
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: fontSize,
        fontFamily: 'monospace',
        padding: '1rem',
        whiteSpace: 'pre-wrap',
        overflowX: 'auto',
        textAlign: 'left',
        boxSizing: 'border-box',
      }}
    >
      <pre style={{ maxWidth: '100%', overflowWrap: 'break-word' }}>{visibleText}</pre>
    </div>
  );
};

export default CoverImage;
