import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PageViewsBarChart from 'src/components/page_views_bar_chart/PageViewsBarChart';

test('renders PageViewsBarChart', () => {
  render(
    <Router>
      <PageViewsBarChart />
    </Router>,
  );
});
