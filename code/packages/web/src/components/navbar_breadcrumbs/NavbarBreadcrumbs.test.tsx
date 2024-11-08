import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavbarBreadcrumbs from 'src/components/navbar_breadcrumbs/NavbarBreadcrumbs';

test('renders App Main page', () => {
  render(
    <Router>
      <NavbarBreadcrumbs />
    </Router>,
  );
});
