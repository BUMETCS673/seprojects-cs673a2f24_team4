import { render, screen } from '@testing-library/react';
import ForgotPasswordPage from './ForgotPasswordPage';

test('renders ForgotPasswordPage with form and reset button', () => {
  render(<ForgotPasswordPage />);

  const emailLabel = screen.getByText(/Email:/i);
  expect(emailLabel).toBeInTheDocument();

  const resetButton = screen.getByRole('button', { name: /Reset Password/i });
  expect(resetButton).toBeInTheDocument();
});
