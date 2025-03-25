import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaGithub, FaLinkedin, FaFileAlt, FaEnvelope, FaEllipsisH } from 'react-icons/fa'; // Added ellipsis icon

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Left-aligned Home Icon */}
        <Link to="/" className="nav-logo">
          <FaHome className="home-icon" />
        </Link>
        
        {/* Breadcrumb-style navigation (Notion-like) */}
        <span className="nav-breadcrumb-separator">/</span>
        <span className="nav-page-title">Portfolio</span>
      </div>

      {/* Center area - can be empty like in Notion */}
      <div className="navbar-center">
        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/projects">Projects</Link>
          <Link to="/experiences">Experiences</Link>
          <Link to="/achievements">Achievements</Link>
        </div>
      </div>
      
      {/* Right-aligned actions */}
      <div className="navbar-right">
        <div className="nav-social-links">
          <a href="YOUR_RESUME_LINK" target="_blank" rel="noopener noreferrer" className="nav-icon-link">
            <FaFileAlt className="nav-icon" />
          </a>
          <a href="https://github.com/YOUR_GITHUB" target="_blank" rel="noopener noreferrer" className="nav-icon-link">
            <FaGithub className="nav-icon" />
          </a>
          <a href="https://linkedin.com/in/YOUR_LINKEDIN" target="_blank" rel="noopener noreferrer" className="nav-icon-link">
            <FaLinkedin className="nav-icon" />
          </a>
          <a href="mailto:your.email@example.com" className="nav-icon-link">
            <FaEnvelope className="nav-icon" />
          </a>
          <button className="nav-more-button">
            <FaEllipsisH className="nav-icon" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
