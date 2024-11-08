import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import StatCard from 'src/components/stat_card/StatCard';

test('renders SideMenuMobile', () => {
  render(
    <Router>
      <StatCard
        title={''}
        value={''}
        interval={''}
        trendText={''}
        trend={'down'}
        data={[]}
      />
    </Router>,
  );
});
