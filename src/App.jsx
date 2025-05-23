import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/Pages/LandingPage';
import StyleGuideVisualizer from './assets/StyleGuideVisualizer';
import Footer from './components/ui/Footer';
import NotFound from './components/Pages/NotFound';
import SoftSkills from './components/Education/SoftSkills';
import SmartSkills from './components/Education/SmartSkills';
import Resources from './components/Education/Resources';
import PersonalBranding from './components/Education/PersonalBranding';
import JobBoard from './components/Employment/JobBoard';
import Internships from './components/Employment/Internships';
import IndustryTrends from './components/Employment/IndustryTrends';
import InterviewGuides from './components/Employment/InterviewGuides';
import Volunteer from './components/Volunteer/Volunteer';

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


            <Route path="/education/soft-skills" element={<SoftSkills />} />
            <Route path="/education/smart-skills" element={<SmartSkills />} />
            <Route path="/education/resources" element={<Resources />} />
            <Route path="/education/personal-branding" element={<PersonalBranding />} />


            <Route path="/employment/job-board" element={<JobBoard />} />
            <Route path="/employment/internships" element={<Internships />} />
            <Route path="/employment/industry-trends" element={<IndustryTrends />} />
            <Route path="/employment/interview-guides" element={<InterviewGuides />} />
        

            <Route path='/volunteer' element={<Volunteer/>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;