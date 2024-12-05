import useJobListings from '../applicant_job_listings/useJobListings';

export const useJobDetails = (jobId: string) => {
  const jobListings = useJobListings();
  return jobListings.jobListings.filter((item) => item.id === jobId)?.[0];
};
