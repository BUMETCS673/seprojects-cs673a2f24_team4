// src/hooks/useJobListings.ts
import { useState, useEffect } from 'react';

const useJobListings = () => {
  const [jobListings, setJobListings] = useState([]);

  useEffect(() => {
    // Fetch job listings data from an API or use dummy data for now
    const fetchJobListings = async () => {
      // Dummy data as an example
      const data = [
        { id: 1, title: 'Software Engineer', company: 'Google', location: 'San Francisco', datePosted: '2023-11-01' },
        { id: 2, title: 'Data Scientist', company: 'Meta', location: 'New York', datePosted: '2023-11-02' },
        { id: 3, title: 'Product Manager', company: 'Amazon', location: 'Seattle', datePosted: '2023-10-30' },
        // Add more job listings here
      ];
      setJobListings(data);
    };

    fetchJobListings();
  }, []);

  return jobListings;
};

export default useJobListings;
