import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SelectContent from 'src/components/select_content/SelectContent';

test('renders SelectContent', () => {
  render(
    <Router>
      <SelectContent />
    </Router>,
  );
});
