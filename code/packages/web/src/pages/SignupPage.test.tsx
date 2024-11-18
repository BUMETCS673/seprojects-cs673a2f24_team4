import { render, screen, fireEvent } from '@testing-library/react';
import SignupPage from './SignupPage';

test('renders Signup page with title and form fields', () => {
  render(<SignupPage />);
  expect(screen.getByText(/Roll the Carpet/i)).toBeInTheDocument();
  expect(screen.getByText(/Signup/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Email \/ Phone/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Confirm Password/i)).toBeInTheDocument();
  expect(screen.getByText(/Signup/i)).toBeInTheDocument();
});

test('updates input fields on change', () => {
  render(<SignupPage />);
  const usernameInput = screen.getByPlaceholderText(/Username/i);
  const emailInput = screen.getByPlaceholderText(/Email \/ Phone/i);
  const passwordInput = screen.getByPlaceholderText(/Password/i);
  const confirmPasswordInput = screen.getByPlaceholderText(/Confirm Password/i);

  fireEvent.change(usernameInput, { target: { value: 'newUser' } });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

  expect(usernameInput).toHaveValue('newUser');
  expect(emailInput).toHaveValue('test@example.com');
  expect(passwordInput).toHaveValue('password123');
  expect(confirmPasswordInput).toHaveValue('password123');
});

test('submits form on Signup button click', () => {
  render(<SignupPage />);
  const signupButton = screen.getByText(/Signup/i);

  fireEvent.click(signupButton);
  // Add assertions here to check if form submission logic is handled correctly
});

test('renders social login buttons', () => {
  render(<SignupPage />);
  expect(screen.getByAltText(/Google/i)).toBeInTheDocument(); // Google login
  expect(screen.getByAltText(/Facebook/i)).toBeInTheDocument(); // Facebook login
  expect(screen.getByAltText(/GitHub/i)).toBeInTheDocument(); // GitHub login
});
