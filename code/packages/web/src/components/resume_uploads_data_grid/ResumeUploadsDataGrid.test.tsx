import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ResumeUploadsDataGrid from 'src/components/resume_uploads_data_grid/ResumeUploadsDataGrid';

test('renders ResumeUploadsDataGrid', () => {
  render(
    <Router>
      <ResumeUploadsDataGrid />
    </Router>,
  );
});
