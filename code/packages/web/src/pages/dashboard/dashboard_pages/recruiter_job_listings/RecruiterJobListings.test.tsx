import { render, screen } from '@testing-library/react';
import { RecruiterJobListings } from './RecruiterJobListings';

describe('Subscription Component', () => {
  it('renders the component without crashing', () => {
    render(<RecruiterJobListings />);
    const billingText = screen.getByText(/RecruiterJobListings/i);
    expect(billingText).toBeInTheDocument();
  });
});
