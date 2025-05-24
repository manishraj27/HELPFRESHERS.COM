import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/ui/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages and Layouts
import AdminLayout from './layouts/AdminLayout';
import VolunteerLayout from './layouts/VolunteerLayout';

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

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  
  // Check if the current route is a protected route
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isVolunteerRoute = location.pathname.startsWith('/volunteer');
  const isAuthRoute = isAdminRoute || isVolunteerRoute;

  // Public routes that should use the public layout
  const publicRoutes = [
    { path: '/', element: <LandingPage /> },
    { path: '/style-guide', element: <StyleGuideVisualizer /> },
    { path: '/education/soft-skills', element: <SoftSkills /> },
    { path: '/education/smart-skills', element: <SmartSkills /> },
    { path: '/education/resources', element: <Resources /> },
    { path: '/education/personal-branding', element: <PersonalBranding /> },
    { path: '/employment/job-board', element: <JobBoard /> },
    { path: '/employment/internships', element: <Internships /> },
    { path: '/employment/industry-trends', element: <IndustryTrends /> },
    { path: '/employment/interview-guides', element: <InterviewGuides /> },
    { path: '/mentorship/book', element: <Mentorship /> },
    { path: '/volunteer', element: <Volunteer /> },
    { path: '*', element: <NotFound /> }
  ];

  // Auth routes that don't need any layout
  const authRoutes = [
    { path: '/admin/login', element: <AdminLogin /> },
    { path: '/volunteer/login', element: <VolunteerLogin /> },
    { path: '/volunteer/set-password', element: <SetPassword /> }
  ];

  return (
    <Routes>
      {/* Public routes with Navbar and Footer */}
      {publicRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<PublicLayout>{element}</PublicLayout>}
        />
      ))}

      {/* Auth routes without any layout */}
      {authRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* Protected admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedUserType="admin">
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Protected volunteer routes */}
      <Route
        path="/volunteer/dashboard"
        element={
          <ProtectedRoute allowedUserType="volunteer">
            <VolunteerLayout>
              <VolunteerDashboard />
            </VolunteerLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppRoutes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;