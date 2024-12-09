// useJobListings.ts
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../../redux/hooks';
import {
  getJobUser,
  deleteJob,
  createJob,
  getJob,
} from '../../../../redux/slices/jobSlice';

const useJobListings = () => {
  const dispatch = useAppDispatch();
  const [jobListings, setJobListings] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobListings = async () => {
      try {
        const { payload } = await dispatch(getJobUser(''));
        setJobListings(payload);
      } catch (err) {
        console.log('Wrong Group');
        fetchJobListingsRecruiter();
      }
    };
    const fetchJobListingsRecruiter = async () => {
      const { payload } = await dispatch(getJob());
      setJobListings(payload);
    };
    fetchJobListings();
  }, [dispatch]);

  const deleteJobListing = async (jobId: string) => {
    try {
      await dispatch(deleteJob(jobId));
      setJobListings((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error('Failed to delete job listing:', error);
    }
  };

  const createJobListing = async (JobListingsPostBody: {
    title: string;
    description: string;
    coreRequirements: string;
  }) => {
    const { payload } = await dispatch(createJob(JobListingsPostBody));
    return payload;
  };

  return {
    jobListings,
    deleteJobListing,
    createJobListing,
  };
};

export default useJobListings;
