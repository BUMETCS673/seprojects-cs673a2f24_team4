import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Search from 'src/components/search/Search';

test('renders Search', () => {
  render(
    <Router>
      <Search />
    </Router>,
  );
});
