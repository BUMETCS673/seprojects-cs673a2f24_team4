import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MenuContent from 'src/components/menu_content/MenuContent';

test('renders App Main page', () => {
  render(
    <Router>
      <MenuContent />
    </Router>,
  );
});
