import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders upload page with necessary elements', () => {
  render(<App />);

  const heading = screen.getByText(/Upload Your Resume/i);
  expect(heading).toBeInTheDocument();

  const uploadResumeButton = screen.getByRole('button', { name: /Upload Resume/i });
  expect(uploadResumeButton).toBeInTheDocument();

  const uploadJobDescriptionButton = screen.getByRole('button', { name: /Upload Job Description/i });
  expect(uploadJobDescriptionButton).toBeInTheDocument();

  const supportText = screen.getByText(/We support .pdf and .doc, .docx formats/i);
  expect(supportText).toBeInTheDocument();

  const warningText = screen.getByText(/Must upload the Job Description or Resume to continue/i);
  expect(warningText).toBeInTheDocument();
});

test('handles button click events', () => {
  render(<App />);

  const resumeButton = screen.getByRole('button', { name: /Upload Resume/i });
  const jobDescriptionButton = screen.getByRole('button', { name: /Upload Job Description/i });

  fireEvent.click(resumeButton);

  fireEvent.click(jobDescriptionButton);
});
