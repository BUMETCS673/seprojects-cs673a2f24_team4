import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SideMenu from 'src/components/side_menu/SideMenu';

test('renders SideMenu', () => {
  render(
    <Router>
      <SideMenu />
    </Router>,
  );
});
