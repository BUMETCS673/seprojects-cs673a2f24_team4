import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders LandingPage, LoginPage, SignupPage and ForgotPasswordPage routes correctly', () => {
  // Render the App component wrapped in Router
  render(
    <Router>
      <App />
    </Router>,
  );

  // Test for elements in the LandingPage
  const landingHeading = screen.getByText(/AI-Powered Resume Shortlisting/i);
  expect(landingHeading).toBeInTheDocument();

  const signUpButton = screen.getByRole('button', { name: /Sign up for free/i });
  expect(signUpButton).toBeInTheDocument();

  const loginButton = screen.getByRole('button', { name: /Login/i });
  expect(loginButton).toBeInTheDocument();
});

test('navigates to LoginPage when clicking on Login button', () => {
  render(
    <Router>
      <App />
    </Router>,
  );

  const loginButton = screen.getByRole('button', { name: /Login/i });
  loginButton.click();

  const loginHeading = screen.getByText(/Login/i);
  expect(loginHeading).toBeInTheDocument();
});

test('navigates to SignupPage when clicking on Sign up button', () => {
  render(
    <Router>
      <App />
    </Router>,
  );

  const signUpButton = screen.getByRole('button', { name: /Sign up for free/i });
  signUpButton.click();

  const signupHeading = screen.getByText(/Sign Up/i);
  expect(signupHeading).toBeInTheDocument();
});

test('navigates to ForgotPasswordPage when clicking on Forgot Password link in LoginPage', () => {
  render(
    <Router>
      <App />
    </Router>,
  );

  // Navigate to Login page
  const loginButton = screen.getByRole('button', { name: /Login/i });
  loginButton.click();

  // Click on 'Forgot Password?' link
  const forgotPasswordLink = screen.getByText(/Forgot Password?/i);
  forgotPasswordLink.click();

  const forgotPasswordHeading = screen.getByText(/Forgot Password?/i);
  expect(forgotPasswordHeading).toBeInTheDocument();
});
