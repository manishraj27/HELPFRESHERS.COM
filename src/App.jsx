import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/Pages/LandingPage';
import StyleGuideVisualizer from './assets/StyleGuideVisualizer';
import Footer from './components/ui/Footer';
import NotFound from './components/Pages/NotFound';

function App() {
  return (
    <>

    <Router>
      <Navbar />
      <div >

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/style-guide" element={<StyleGuideVisualizer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
    </>
  );
}

export default App;