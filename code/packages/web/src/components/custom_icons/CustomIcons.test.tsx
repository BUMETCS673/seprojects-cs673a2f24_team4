import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CustomIcons } from './CustomIcons';

test('renders CustomIcon', () => {
  render(
    <Router>
      <CustomIcons />
    </Router>,
  );
});
