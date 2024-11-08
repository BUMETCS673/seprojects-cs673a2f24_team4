import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CustomDatePicker from 'src/components/custom_date_picker/CustomDatePicker';

test('renders App Main page', () => {
  render(
    <Router>
      <CustomDatePicker />
    </Router>,
  );
});
