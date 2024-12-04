import { render, screen } from '@testing-library/react';
import { ApplicantAnalytics } from './ApplicantAnalytics';

// Mocking child components
jest.mock('src/components/ResumeScoreChart', () => () => <div>Mocked Resume Score Chart</div>);
jest.mock('src/components/ResumeUploadsBarChart', () => () => <div>Mocked Resume Uploads Bar Chart</div>);
jest.mock('src/components/ResumeUploadsDataGrid', () => () => <div>Mocked Resume Uploads Data Grid</div>);
jest.mock('src/components/CustomizedTreeView', () => () => <div>Mocked Customized Tree View</div>);
jest.mock('src/components/ChartApplicantByCountry', () => () => <div>Mocked Applicant by Country Chart</div>);
jest.mock('src/components/StatCard', () => () => <div>Mocked Stat Card</div>);
jest.mock('src/components/HighlightedCard', () => () => <div>Mocked Highlighted Card</div>);
jest.mock('src/internals/components/Copyright', () => () => <div>Mocked Copyright</div>);

describe('ApplicantAnalytics Component', () => {
  it('renders the component without crashing', () => {
    render(<ApplicantAnalytics />);
    // Use role or specific query to isolate the Typography heading
    const overviewHeading = screen.getByRole('heading', { name: /Overview/i });
    const resumeUploadsHeading = screen.getByRole('heading', { name: /Resume Uploads/i });

    expect(overviewHeading).toBeInTheDocument();
    expect(resumeUploadsHeading).toBeInTheDocument();
  });

  it('renders the mocked components correctly', () => {
    render(<ApplicantAnalytics />);

    // Verify each mocked component renders the correct number of times
    expect(screen.getAllByText(/Mocked Stat Card/i)).toHaveLength(3); // 3 StatCards
    expect(screen.getByText(/Mocked Highlighted Card/i)).toBeInTheDocument();
    expect(screen.getByText(/Mocked Resume Score Chart/i)).toBeInTheDocument();
    expect(screen.getByText(/Mocked Resume Uploads Bar Chart/i)).toBeInTheDocument();
    expect(screen.getByText(/Mocked Resume Uploads Data Grid/i)).toBeInTheDocument();
    expect(screen.getByText(/Mocked Customized Tree View/i)).toBeInTheDocument();
    expect(screen.getByText(/Mocked Applicant by Country Chart/i)).toBeInTheDocument();
    expect(screen.getByText(/Mocked Copyright/i)).toBeInTheDocument();
  });
});
