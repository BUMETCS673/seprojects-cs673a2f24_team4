import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Copyright from './Copyright';

test('renders Copyright', () => {
  render(
    <Router>
      <Copyright />
    </Router>,
  );
});
