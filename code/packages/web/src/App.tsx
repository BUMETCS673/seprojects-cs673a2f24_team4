import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
  RecruiterShortlists,
} from 'src/pages/dashboard/dashboard_pages';
import { ROUTES, APPLICANT_ROUTES, RECRUITER_ROUTES } from 'src/react_router/routes';
import { useAppDispatch } from './redux/hooks';
import UserService from './services/UserService';
import { getMe } from './redux/slices/meSlice';
import JobDetails from './pages/dashboard/dashboard_pages/job_details';
import Unauthorized from 'src/pages/unauthorized';
import { RootState } from './redux/store'; // Adjust the import path accordingly
import { RecruiterAnalytics } from './pages/dashboard/dashboard_pages'; // Assuming this component exists
import { RecruiterJobListings } from './pages/dashboard/dashboard_pages'; // Assuming this component exists

interface ProtectedRouteProps {
  path: string;
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, element }) => {
  const userGroup = useSelector((state: RootState) => state.me.response?.user.group);

  const isRouteAllowed = (path: string) => {
    if (!userGroup) {
      return false;
    }
    if (userGroup === 'user') {
      return APPLICANT_ROUTES.includes(path);
    } else if (userGroup === 'recruiter') {
      return RECRUITER_ROUTES.includes(path);
    }
    return false;
  };

  if (!userGroup) {
    return <Navigate to="/unauthorized" state={{ from: path }} replace />;
  }

  if (!isRouteAllowed(path)) {
    return <Navigate to="/unauthorized" state={{ from: path }} replace />;
  }

  return <>{element}</>;
};

const AnalyticsPage: React.FC = () => {
  const userGroup = useSelector((state: RootState) => state.me.response?.user.group);
  if (userGroup === 'user') {
    return (
      <DashboardLayout>
        <ApplicantAnalytics />
      </DashboardLayout>
    );
  } else if (userGroup === 'recruiter') {
    return (
      <DashboardLayout>
        <RecruiterAnalytics />
      </DashboardLayout>
    );
  } else {
    return null;
  }
};

const JobListingsPage: React.FC = () => {
  const userGroup = useSelector((state: RootState) => state.me.response?.user.group);
  if (userGroup === 'user') {
    return (
      <DashboardLayout>
        <ApplicantJobListings />
      </DashboardLayout>
    );
  } else if (userGroup === 'recruiter') {
    return (
      <DashboardLayout>
        <RecruiterJobListings />
      </DashboardLayout>
    );
  } else {
    return null;
  }
};

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (UserService.isLoggedIn()) {
      dispatch(getMe());
    }
  }, [dispatch]);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/home" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Common Protected Routes */}
          <Route
            path={ROUTES.profile}
            element={
              <ProtectedRoute
                path={ROUTES.profile}
                element={
                  <DashboardLayout>
                    <Profile />
                  </DashboardLayout>
                }
              />
            }
          />
          <Route
            path={ROUTES.billing}
            element={
              <ProtectedRoute
                path={ROUTES.billing}
                element={
                  <DashboardLayout>
                    <Billing />
                  </DashboardLayout>
                }
              />
            }
          />
          <Route
            path={ROUTES.subscription}
            element={
              <ProtectedRoute
                path={ROUTES.subscription}
                element={
                  <DashboardLayout>
                    <ManageSubscription />
                  </DashboardLayout>
                }
              />
            }
          />

          {/* Shared Protected Routes with userGroup-specific components */}
          <Route
            path={ROUTES.analytics}
            element={
              <ProtectedRoute
                path={ROUTES.analytics}
                element={<AnalyticsPage />}
              />
            }
          />
          <Route
            path={ROUTES.jobListings}
            element={
              <ProtectedRoute
                path={ROUTES.jobListings}
                element={<JobListingsPage />}
              />
            }
          />

          {/* Applicant-only Protected Routes */}
          <Route
            path={ROUTES.resumeAnalysis}
            element={
              <ProtectedRoute
                path={ROUTES.resumeAnalysis}
                element={
                  <DashboardLayout>
                    <ApplicantResumeAnalysis />
                  </DashboardLayout>
                }
              />
            }
          />

          {/* Recruiter-only Protected Routes */}
          <Route
            path={ROUTES.shortlists}
            element={
              <ProtectedRoute
                path={ROUTES.shortlists}
                element={
                  <DashboardLayout>
                    <RecruiterShortlists />
                  </DashboardLayout>
                }
              />
            }
          />

          {/* Shared Protected Routes */}
          <Route
            path={ROUTES.jobDetails}
            element={
              <ProtectedRoute
                path={ROUTES.jobDetails}
                element={
                  <DashboardLayout>
                    <JobDetails />
                  </DashboardLayout>
                }
              />
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/unauthorized" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
