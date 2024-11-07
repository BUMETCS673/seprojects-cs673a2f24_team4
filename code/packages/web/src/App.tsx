import { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import LandingPage from 'src/pages/landing_page/LandingPage';
import { ROUTES } from 'src/react_router/routes';

const commonRoutes: React.ReactElement[] = [
  <Route
    key={ROUTES.profile}
    path={ROUTES.profile}
    element={
      <DashboardLayout>
        <Profile />
      </DashboardLayout>
    }
  />,
  <Route
    key={ROUTES.billing}
    path={ROUTES.billing}
    element={
      <DashboardLayout>
        <Billing />
      </DashboardLayout>
    }
  />,
  <Route
    key={ROUTES.subscription}
    path={ROUTES.subscription}
    element={
      <DashboardLayout>
        <ManageSubscription />
      </DashboardLayout>
    }
  />,
];

const applicantRoutes: React.ReactElement[] = [
  <Route
    key={ROUTES.analytics}
    path={ROUTES.analytics}
    element={
      <DashboardLayout>
        <ApplicantAnalytics />
      </DashboardLayout>
    }
  />,
  <Route
    key={ROUTES.resumeAnalysis}
    path={ROUTES.resumeAnalysis}
    element={
      <DashboardLayout>
        <ApplicantResumeAnalysis />
      </DashboardLayout>
    }
  />,
  <Route
    key={ROUTES.jobListings}
    path={ROUTES.jobListings}
    element={
      <DashboardLayout>
        <ApplicantJobListings />
      </DashboardLayout>
    }
  />,
  <Route
    key={ROUTES.shortlists}
    path={ROUTES.shortlists}
    element={
      <DashboardLayout>
        <RecruiterShortlists />
      </DashboardLayout>
    }
  />,
];

function App() {
  const routes = useMemo(() => {
    return [...applicantRoutes, ...commonRoutes];
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Router>
        <Routes>
          <Route path="/home" element={<LandingPage />} />
          {routes.map((route) => route)}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
