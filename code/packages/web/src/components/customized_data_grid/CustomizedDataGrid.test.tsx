import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CustomizedDataGrid from './CustomizedDataGrid';

test('renders CustomizedDataGrid', () => {
  render(
    <Router>
      <CustomizedDataGrid />
    </Router>,
  );
});
