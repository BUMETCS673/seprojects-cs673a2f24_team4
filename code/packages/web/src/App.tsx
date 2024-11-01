import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardLayout from 'src/pages/dashboard/DashboardLayout';
import ApplicantAnalytics from 'src/pages/dashboard/dashboard_pages/applicant_analytics/ApplicantAnalytics';

function App() {
  return (
    <div style={{ height: '100vh' }}>
      <Router>
        <Routes>
          <Route path="/home" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/dashboard/analytics"
            element={<DashboardLayout element={<ApplicantAnalytics />} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
