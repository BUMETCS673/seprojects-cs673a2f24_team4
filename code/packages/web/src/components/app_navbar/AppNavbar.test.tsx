import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppNavbar from './AppNavbar';

test('renders AppNavbar', () => {
  render(
    <Router>
      <AppNavbar />
    </Router>,
  );
});
