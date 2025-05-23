import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/Pages/LandingPage';
import StyleGuideVisualizer from './assets/StyleGuideVisualizer';

function App() {
  return (
    <>
          <style jsx>{`
          :root {
            --font-primary: 'Poppins', sans-serif;
            --font-secondary: 'Montserrat', sans-serif;
            --radius: 0.625rem;
            
            /* Light mode colors */
            --background: oklch(0.98 0.01 300);
            --foreground: oklch(0.2 0.05 280);
            --card: oklch(1 0 0);
            --card-foreground: oklch(0.2 0.05 280);
            --popover: oklch(1 0 0);
            --popover-foreground: oklch(0.2 0.05 280);
            --primary: oklch(0.8 0.15 85);
            --primary-foreground: oklch(0.1 0.02 280);
            --secondary: oklch(0.75 0.15 300);
            --secondary-foreground: oklch(1 0 0);
            --accent: oklch(0.65 0.2 280);
            --accent-foreground: oklch(1 0 0);
            --muted: oklch(0.95 0.03 280);
            --muted-foreground: oklch(0.5 0.1 280);
            --destructive: oklch(0.7 0.25 350);
            --border: oklch(0.9 0.05 280);
            --input: oklch(0.9 0.05 280);
            --ring: oklch(0.8 0.15 85);
            --chart-1: oklch(0.65 0.2 280);
            --chart-2: oklch(0.8 0.15 85);
            --chart-3: oklch(0.6 0.2 250);
            --chart-4: oklch(0.7 0.25 350);
            --chart-5: oklch(0.75 0.15 300);
          }
          
          .dark {
            --background: oklch(0.15 0.05 280);
            --foreground: oklch(0.95 0.02 300);
            --card: oklch(0.2 0.05 280);
            --card-foreground: oklch(0.95 0.02 300);
            --popover: oklch(0.2 0.05 280);
            --popover-foreground: oklch(0.95 0.02 300);
            --primary: oklch(0.75 0.12 85);
            --primary-foreground: oklch(0.1 0.02 280);
            --secondary: oklch(0.3 0.1 300);
            --secondary-foreground: oklch(0.95 0.02 300);
            --accent: oklch(0.4 0.15 280);
            --accent-foreground: oklch(0.95 0.02 300);
            --muted: oklch(0.25 0.05 280);
            --muted-foreground: oklch(0.7 0.1 280);
            --destructive: oklch(0.75 0.25 350);
            --border: oklch(0.3 0.1 280);
            --input: oklch(0.3 0.1 280);
            --ring: oklch(0.75 0.12 85);
            --chart-1: oklch(0.5 0.25 280);
            --chart-2: oklch(0.75 0.12 85);
            --chart-3: oklch(0.5 0.2 250);
            --chart-4: oklch(0.6 0.25 350);
            --chart-5: oklch(0.6 0.15 300);
          }
          
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
          }
          
          body {
            font-family: 'Poppins', sans-serif;
          }
        `}</style>
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