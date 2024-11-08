import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MenuButton from 'src/components/menu_button/MenuButton';

test('renders App Main page', () => {
  render(
    <Router>
      <MenuButton />
    </Router>,
  );
});
