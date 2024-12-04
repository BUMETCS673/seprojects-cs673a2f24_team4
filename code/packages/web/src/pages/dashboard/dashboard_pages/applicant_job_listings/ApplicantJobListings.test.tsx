import { render, screen } from '@testing-library/react';
import { ApplicantJobListings } from './ApplicantJobListings';

jest.mock('src/components/JobCard', () => () => <div>Mocked JobCard - View Details</div>);

describe('ApplicantJobListings Component', () => {
  it('renders the component correctly', () => {
    render(<ApplicantJobListings />);
    expect(screen.getByText(/Job Listings/i)).toBeInTheDocument();
  });

  it('renders the correct number of job cards', () => {
    render(<ApplicantJobListings />);
    const jobCards = screen.getAllByText(/Mocked JobCard - View Details/i);
    expect(jobCards.length).toBe(3); // Update this value based on the number of job cards rendered
  });

  it('renders job details correctly', () => {
    render(<ApplicantJobListings />);
    const jobDetails = screen.getAllByText(/Mocked JobCard - View Details/i);
    expect(jobDetails).toHaveLength(3); // Update to match the expected number of elements
  });
});
