import { render, screen } from '@testing-library/react';
import { ManageSubscription } from './ManageSubscription';

describe('Subscription Component', () => {
  it('renders the component without crashing', () => {
    render(<ManageSubscription />);
    const billingText = screen.getByText(/ManageSubscription/i);
    expect(billingText).toBeInTheDocument();
  });
});
