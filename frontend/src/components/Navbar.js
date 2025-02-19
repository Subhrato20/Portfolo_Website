import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">Home Page</Link>
      <div className="nav-links">
        <Link to="/projects">Projects</Link>
        <Link to="/experiences">Experiences</Link>
      </div>
    </nav>
  );
};

export default Navbar;
