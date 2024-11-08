import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from 'src/components/header/Header';

test('renders App Main page', () => {
  render(
    <Router>
      <Header />
    </Router>,
  );
});
