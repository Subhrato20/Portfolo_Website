import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import About from './pages/About';
import Projects from './pages/Projects';
import Experiences from './pages/Experiences';
import GroqChat from './pages/GroqChat';
import Achievements from './pages/Achievements';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/achievements" element={<Achievements />} />
          </Routes>
        </div>
        {/* Notion-style AI chat component */}
        <GroqChat />
      </div>
    </Router>
  );
}

export default App;
