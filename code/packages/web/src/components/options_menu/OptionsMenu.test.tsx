import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import OptionsMenu from './OptionsMenu';

test('renders OptionsMenu', () => {
  render(
    <Router>
      <OptionsMenu />
    </Router>,
  );
});
