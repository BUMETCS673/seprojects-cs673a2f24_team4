import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './LoginPage';

test('renders LoginPage with form and link to signup', () => {
  render(
    <Router>
      <LoginPage />
    </Router>
  );

  const usernameLabel = screen.getByText(/Username:/i);
  expect(usernameLabel).toBeInTheDocument();

  const passwordLabel = screen.getByText(/Password:/i);
  expect(passwordLabel).toBeInTheDocument();

  const loginButton = screen.getByRole('button', { name: /Login/i });
  expect(loginButton).toBeInTheDocument();

  const signupLink = screen.getByText(/Sign up/i);
  expect(signupLink).toBeInTheDocument();
});
