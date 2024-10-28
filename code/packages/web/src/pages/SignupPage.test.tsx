import { render, screen } from '@testing-library/react';
import SignupPage from './SignupPage';

test('renders SignupPage with form fields and submit button', () => {
  render(<SignupPage />);

  const usernameLabel = screen.getByText(/Username:/i);
  expect(usernameLabel).toBeInTheDocument();

  const emailLabel = screen.getByText(/Email:/i);
  expect(emailLabel).toBeInTheDocument();

  const passwordLabel = screen.getByText(/Password:/i);
  expect(passwordLabel).toBeInTheDocument();

  const confirmPasswordLabel = screen.getByText(/Confirm Password:/i);
  expect(confirmPasswordLabel).toBeInTheDocument();

  const signupButton = screen.getByRole('button', { name: /Sign Up/i });
  expect(signupButton).toBeInTheDocument();
});
