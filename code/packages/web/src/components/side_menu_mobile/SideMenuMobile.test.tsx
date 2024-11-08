import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SideMenuMobile from 'src/components/side_menu_mobile/SideMenuMobile';

test('renders SideMenuMobile', () => {
  render(
    <Router>
      <SideMenuMobile open={true} toggleDrawer={() => () => {}} />
    </Router>,
  );
});
