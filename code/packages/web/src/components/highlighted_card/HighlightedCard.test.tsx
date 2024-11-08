import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HighlightedCard from 'src/components/highlighted_card/HighlightedCard';

test('renders App Main page', () => {
  render(
    <Router>
      <HighlightedCard heading={''} subHeading={''} buttonText={''} />
    </Router>,
  );
});
