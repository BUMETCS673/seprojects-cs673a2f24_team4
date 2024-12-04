export const ROUTES = {
  profile: '/dashboard/profile',
  billing: '/dashboard/billing',
  subscription: '/dashboard/manage-subscription',
  analytics: '/dashboard/analytics',
  resumeAnalysis: '/dashboard/resume-analysis',
  jobListings: '/dashboard/job-listings',
  shortlists: '/dashboard/shortlists',
  jobDetails: '/dashboard/job/:jobId',
};

// Define routes accessible by Applicants and Recruiters
export const APPLICANT_ROUTES = [
  ROUTES.profile,
  ROUTES.billing,
  ROUTES.subscription,
  ROUTES.analytics,
  ROUTES.resumeAnalysis,
  ROUTES.jobDetails,
];

export const RECRUITER_ROUTES = [
  ROUTES.profile,
  ROUTES.analytics,
  ROUTES.jobListings,
  ROUTES.shortlists,
  ROUTES.jobDetails,
];
