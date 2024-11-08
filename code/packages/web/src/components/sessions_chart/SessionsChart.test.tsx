import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SessionsChart from 'src/components/sessions_chart/SessionsChart';

test('renders SessionsChart', () => {
  render(
    <Router>
      <SessionsChart />
    </Router>,
  );
});
