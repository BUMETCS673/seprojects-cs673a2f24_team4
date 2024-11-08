import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CustomizedTreeView from 'src/components/customized_tree_view/CustomizedTreeView';

test('renders App Main page', () => {
  render(
    <Router>
      <CustomizedTreeView />
    </Router>,
  );
});
