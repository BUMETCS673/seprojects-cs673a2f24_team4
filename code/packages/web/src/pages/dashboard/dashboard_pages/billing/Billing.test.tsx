import { render, screen } from '@testing-library/react';
import { Billing } from './Billing';

describe('Billing Component', () => {
  it('renders the component without crashing', () => {
    render(<Billing />);
    const billingText = screen.getByText(/Billing/i);
    expect(billingText).toBeInTheDocument();
  });
});
