// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ReportIncident from './pages/ReportIncident';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report-incident" element={<ReportIncident />} />
      </Routes>
    </Router>
  );
}

export default App;
