import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cover from './components/Cover';
import About from './components/About';
import Projects from './components/Projects';

function App() {
  return (
    <Router>
      {/* Notion-like minimal layout */}
      <div className="app-container">
        {/* We can always have the Cover at the top or route-based */}
        <Cover />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
