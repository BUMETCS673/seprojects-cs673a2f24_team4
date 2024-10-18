import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Vite and React logos and a button', () => {
  render(<App />);
  
  const viteLogo = screen.getByAltText('Vite logo');
  expect(viteLogo).toBeInTheDocument();
  
  const reactLogo = screen.getByAltText('React logo');
  expect(reactLogo).toBeInTheDocument();

  const button = screen.getByRole('button', { name: /count is 0/i });
  expect(button).toBeInTheDocument();

  const heading = screen.getByText(/Vite \+ React/i);
  expect(heading).toBeInTheDocument();
});

test('increments count on button click', () => {
  render(<App />);

  const button = screen.getByRole('button', { name: /count is 0/i });

  fireEvent.click(button);

  expect(button).toHaveTextContent('count is 1');
});