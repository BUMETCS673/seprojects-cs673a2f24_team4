import * as yup from 'yup';

const textRequired = yup.string().required();
const textOptional = yup.string();

export const validatePostMe = yup.object().shape({
  firstName: textOptional.min(2).max(255),
  lastName: textOptional.min(2).max(255),
  phone: textOptional.min(10).max(15),
});

export const validatePostJobListing = yup.object().shape({
  title: textRequired.min(2).max(200),
  description: textRequired.min(2).max(3000),
  coreRequirements: textRequired.min(2).max(3000),
});

export const validatePutJobListing = yup.object().shape({
  title: textOptional.min(2).max(200),
  description: textOptional.min(2).max(3000),
  coreRequirements: textOptional.min(2).max(3000),
});

export const validatePostResume = yup.object().shape({
  storageId: textRequired,
});

export const validatePostApplications = yup.object().shape({
  jobListingId: textRequired,
  resumeId: textRequired,
});

enum ApplicationStatus {
  APPLIED = 'APPLIED',
  CANCELLED = 'CANCELLED',
  INTERVIEWING = 'INTERVIEWING',
  REJECTED = 'REJECTED',
  OFFER = 'OFFER',
}
export const validatePutApplications = yup.object().shape({
  status: yup
    .mixed<ApplicationStatus>()
    .oneOf(Object.values(ApplicationStatus))
    .required(),
});
export const validatePostShortlist = yup.object().shape({
  applicationId: textRequired,
  jobListingId: textRequired,
});
