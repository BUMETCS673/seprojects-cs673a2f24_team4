import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ChartApplicantByCountry from 'nents/chart_applicant_by_country/ChartApplicantByCountry';

test('renders App Main page', () => {
  render(
    <Router>
      <ChartApplicantByCountry />
    </Router>,
  );
});
