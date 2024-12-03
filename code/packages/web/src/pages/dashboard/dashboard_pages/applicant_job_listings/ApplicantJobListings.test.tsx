import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ApplicantJobListings } from './ApplicantJobListings';
import useJobListings from './useJobListings';

// Mock the `useJobListings` hook
jest.mock('./pages/dashboard/dashboard_pages/applicant_job_listings/useJobListings', () => jest.fn());

describe('ApplicantJobListings Component', () => {
  beforeEach(() => {
    // Mock job listings data
    (useJobListings as jest.Mock).mockReturnValue([
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
    ]);
  });

  it('renders the component correctly', () => {
    render(<ApplicantJobListings />);

    // Check for the main title
    expect(screen.getByText('Job Listings')).toBeInTheDocument();

    // Check for job count
    expect(screen.getByText('Showing 2 jobs')).toBeInTheDocument();
  });

  it('renders the correct number of job cards', () => {
    render(<ApplicantJobListings />);

    // Ensure that two JobCard components are rendered
    const jobCards = screen.getAllByText('View Details');
    expect(jobCards.length).toBe(2);
  });

  it('renders job details correctly', () => {
    render(<ApplicantJobListings />);

    // Check if the job titles are displayed
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Data Scientist')).toBeInTheDocument();

    // Check if company names are displayed
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Meta')).toBeInTheDocument();

    // Check if locations are displayed
    expect(screen.getByText('San Francisco - 2023-11-01')).toBeInTheDocument();
    expect(screen.getByText('New York - 2023-11-02')).toBeInTheDocument();
  });
});
