import { useState, useEffect } from 'react';

interface JobListing {
  id: number;
  title: string;
  company: string;
  location: string;
  datePosted: string;
}

const useJobListings = (): JobListing[] => {
  const [jobListings, setJobListings] = useState<JobListing[]>([]);

  useEffect(() => {
    const fetchJobListings = async () => {
      const data: JobListing[] = [
        {
          id: 1,
          title: 'Software Engineer',
          company: 'Google',
          location: 'San Francisco',
          datePosted: '2023-11-01',
        },
        {
          id: 2,
          title: 'Data Scientist',
          company: 'Meta',
          location: 'New York',
          datePosted: '2023-11-02',
        },
        {
          id: 3,
          title: 'Product Manager',
          company: 'Amazon',
          location: 'Seattle',
          datePosted: '2023-10-30',
        },
      ];
      setJobListings(data);
    };

    fetchJobListings();
  }, []);

  return jobListings;
};

export default useJobListings;

