import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ResumeScoreChart from 'src/components/resume_score_chart/ResumeScoreChart';

test('renders PageViewsBarChart', () => {
  render(
    <Router>
      <ResumeScoreChart />
    </Router>,
  );
});
