import React from 'react';

function MainContent() {
  return (
    <div className="main-content">
      {/* Example Section #1: Inbox */}
      <div className="notion-section">
        <h2>Inbox</h2>
        <div className="notion-block">
          <strong>Inbox</strong>  
          <p>Some items or notes here...</p>
        </div>
      </div>

      {/* Example Section #2: Tasks */}
      <div className="notion-section">
        <h2>Tasks</h2>
        <div className="notion-block">
          <ul>
            <li>Task 1</li>
            <li>Task 2</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
