import { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardLayout from 'src/pages/dashboard/DashboardLayout';
import {
  ApplicantAnalytics,
  ApplicantJobListings,
  ApplicantResumeAnalysis,
  Billing,
  ManageSubscription,
  Profile,
} from 'src/pages/dashboard/dashboard_pages';

const commonRoutes: React.ReactElement[] = [
  <Route
    path="/dashboard/profile"
    element={
      <DashboardLayout>
        <Profile />
      </DashboardLayout>
    }
  />,
  <Route
    path="/dashboard/billing"
    element={
      <DashboardLayout>
        <Billing />
      </DashboardLayout>
    }
  />,
  <Route
    path="/dashboard/manage-subscription"
    element={
      <DashboardLayout>
        <ManageSubscription />
      </DashboardLayout>
    }
  />,
];

const applicantRoutes: React.ReactElement[] = [
  <Route
    path="/dashboard/analytics"
    element={
      <DashboardLayout>
        <ApplicantAnalytics />
      </DashboardLayout>
    }
  />,
  <Route
    path="/dashboard/resume-analysis"
    element={
      <DashboardLayout>
        <ApplicantResumeAnalysis />
      </DashboardLayout>
    }
  />,
  <Route
    path="/dashboard/job-listings"
    element={
      <DashboardLayout>
        <ApplicantJobListings />
      </DashboardLayout>
    }
  />,
];

function App() {
  const routes = useMemo(() => {
    return [...applicantRoutes, ...commonRoutes];
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <Router>
        <Routes>
          <Route path="/home" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          {routes.map((route) => route)}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
