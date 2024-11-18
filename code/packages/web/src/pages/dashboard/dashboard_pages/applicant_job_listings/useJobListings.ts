// src/hooks/useJobListings.ts
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../../redux/hooks';
import { getJobUser } from '../../../../redux/slices/jobSlice';

const useJobListings = () => {
  const dispatch = useAppDispatch();

  const [jobListings, setJobListings] = useState<any[]>([]);

  useEffect(() => {
    // Fetch job listings data from an API or use dummy data for now
    const fetchJobListings = async () => {
      const { payload } = await dispatch(getJobUser(''));
      console.log(payload);
      setJobListings(payload);
    };

    fetchJobListings();
  }, []);

  return jobListings;
};

export default useJobListings;
