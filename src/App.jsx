import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/ui/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './components/Pages/LandingPage';
import StyleGuideVisualizer from './assets/StyleGuideVisualizer';
import NotFound from './components/Pages/NotFound';

// Education Components
import SoftSkills from './components/Education/SoftSkills';
import SmartSkills from './components/Education/SmartSkills';
import Resources from './components/Education/Resources';
import PersonalBranding from './components/Education/PersonalBranding';

// Employment Components
import JobBoard from './components/Employment/JobBoard';
import Internships from './components/Employment/Internships';
import IndustryTrends from './components/Employment/IndustryTrends';
import InterviewGuides from './components/Employment/InterviewGuides';

// Auth Components
import AdminLogin from './Admin/Login';
import AdminDashboard from './Admin/Dashboard';
import VolunteerLogin from './Volunteer/Login';
import VolunteerDashboard from './Volunteer/Dashboard';

// Other Components
import Volunteer from './components/Volunteer/Volunteer';
import Mentorship from './components/Mentorship/Mentorship';
import SetPassword from './Volunteer/SetPassword';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Navbar />
          <div>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/style-guide" element={<StyleGuideVisualizer />} />
              <Route path="*" element={<NotFound />} />

              {/* Education Routes */}
              <Route path="/education/soft-skills" element={<SoftSkills />} />
              <Route path="/education/smart-skills" element={<SmartSkills />} />
              <Route path="/education/resources" element={<Resources />} />
              <Route path="/education/personal-branding" element={<PersonalBranding />} />

              {/* Employment Routes */}
              <Route path="/employment/job-board" element={<JobBoard />} />
              <Route path="/employment/internships" element={<Internships />} />
              <Route path="/employment/industry-trends" element={<IndustryTrends />} />
              <Route path="/employment/interview-guides" element={<InterviewGuides />} />

              {/* Auth Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedUserType="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route path="/volunteer/login" element={<VolunteerLogin />} />
              <Route
                path="/volunteer/dashboard"
                element={
                  <ProtectedRoute allowedUserType="volunteer">
                    <VolunteerDashboard />
                  </ProtectedRoute>
                }
              />

<Route path="/volunteer/set-password" element={<SetPassword />} />

              {/* Other Routes */}
              <Route path="mentorship/book" element={<Mentorship />} />
              <Route path='/volunteer' element={<Volunteer/>} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;