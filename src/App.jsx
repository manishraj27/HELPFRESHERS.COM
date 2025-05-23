import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/Pages/LandingPage';
import StyleGuideVisualizer from './assets/StyleGuideVisualizer';

function App() {
  return (
    <>

    <Router>
      <Navbar />
      <div >

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/style-guide" element={<StyleGuideVisualizer />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;