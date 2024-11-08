import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CardAlert from 'nents/card_alert/CardAlert';

test('renders Card Alert', () => {
  render(
    <Router>
      <CardAlert />
    </Router>,
  );
});
