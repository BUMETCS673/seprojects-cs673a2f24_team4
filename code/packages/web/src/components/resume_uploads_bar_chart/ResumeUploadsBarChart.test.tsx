import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ResumeUploadsBarChart from 'src/components/resume_uploads_bar_chart/ResumeUploadsBarChart';

test('renders ResumeUploadsBarChart', () => {
  render(
    <Router>
      <ResumeUploadsBarChart />
    </Router>,
  );
});
