import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './LandingPage';

test('renders LandingPage with heading, description and buttons', () => {
  render(
    <Router>
      <LandingPage />
    </Router>,
  );

  const heading = screen.getByText(/AI-Powered Resume Shortlisting/i);
  expect(heading).toBeInTheDocument();

  const description = screen.getByText(
    /Automate your hiring process by finding the best-fit candidates./i,
  );
  expect(description).toBeInTheDocument();

  const signUpButton = screen.getByRole('button', { name: /Sign up for free/i });
  expect(signUpButton).toBeInTheDocument();

  const loginButton = screen.getByRole('button', { name: /Login/i });
  expect(loginButton).toBeInTheDocument();
});
