import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaGithub, FaLinkedin, FaFileAlt, FaEnvelope } from 'react-icons/fa'; // Import Icons

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left-aligned Home Icon */}
      <Link to="/" className="nav-logo">
        <FaHome className="home-icon" />
      </Link>

      {/* Centered Navigation Links */}
      <div className="nav-links">
        <Link to="/projects">Projects</Link>
        <Link to="/experiences">Experiences</Link>
      </div>
      
      {/* TODO: Add Mailto */}

        
      <div className="nav-social-links">
      <a href="YOUR_RESUME_LINK" target="_blank" rel="noopener noreferrer">
          <FaFileAlt className="nav-icon" />
        </a>
        <a href="https://github.com/YOUR_GITHUB" target="_blank" rel="noopener noreferrer">
          <FaGithub className="nav-icon" />
        </a>
        <a href="https://linkedin.com/in/YOUR_LINKEDIN" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="nav-icon" />
        </a>
        <a href="mailto:your.email@example.com">
          <FaEnvelope className="nav-icon" />
        </a>
    </div>

    </nav>
  );
};

export default Navbar;
