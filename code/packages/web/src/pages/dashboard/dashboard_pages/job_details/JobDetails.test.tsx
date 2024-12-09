import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import JobDetails from '.';
import { useJobDetails } from './useJobDetail';
import moment from 'moment';

// Mock the useJobDetails function
jest.mock('./useJobDetail', () => ({
  useJobDetails: jest.fn(),
}));

// Mock useParams to provide a specific jobId
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ jobId: '123' }),
}));

describe('JobDetails component', () => {
  const jobDetailMock = {
    title: 'Software Engineer',
    createdAt: '2023-08-01T00:00:00Z',
    description: 'This is a description of the job.',
  };

  beforeEach(() => {
    // Set the mock return value of useJobDetails
    (useJobDetails as jest.Mock).mockReturnValue(jobDetailMock);
  });

  test('renders job title', () => {
    render(
      <BrowserRouter>
        <JobDetails />
      </BrowserRouter>,
    );

    const titleElement = screen.getByText('Software Engineer');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('H1');
  });

  test('renders job description', () => {
    render(
      <BrowserRouter>
        <JobDetails />
      </BrowserRouter>,
    );

    const descriptionElement = screen.getByText('This is a description of the job.');
    expect(descriptionElement).toBeInTheDocument();
  });

  test('renders job created date in correct format', () => {
    render(
      <BrowserRouter>
        <JobDetails />
      </BrowserRouter>,
    );

    const formattedDate = moment(jobDetailMock.createdAt).format('mm/DD/yyyy');
    const dateElement = screen.getByText(`Company | Location | ${formattedDate}`);
    expect(dateElement).toBeInTheDocument();
  });

  test('does not render job details if jobDetail is undefined', () => {
    (useJobDetails as jest.Mock).mockReturnValue(undefined);

    render(
      <BrowserRouter>
        <JobDetails />
      </BrowserRouter>,
    );

    const titleElement = screen.queryByText('Software Engineer');
    expect(titleElement).not.toBeInTheDocument();

    const descriptionElement = screen.queryByText(
      'This is a description of the job.',
    );
    expect(descriptionElement).not.toBeInTheDocument();
  });
});
