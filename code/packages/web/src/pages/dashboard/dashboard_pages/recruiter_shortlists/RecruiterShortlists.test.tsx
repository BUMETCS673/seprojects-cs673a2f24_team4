// import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RecruiterShortlists } from './RecruiterShortlists';
import { applicationsData } from 'src/internals/data/gridData';
// import { DataGrid } from '@mui/x-data-grid';

describe('RecruiterShortlists Component', () => {
  it('renders Job Applications and Shortlisted Applications tables', () => {
    render(<RecruiterShortlists />);
    
    // Check if the headings for the tables are rendered
    expect(screen.getByText('Job Applications')).toBeInTheDocument();
    expect(screen.getByText('Shortlisted Applications')).toBeInTheDocument();
  });

  it('selects and shortlists applications', () => {
    render(<RecruiterShortlists />);
    
    // Mock a row selection event
    const rowCheckboxes = screen.getAllByRole('checkbox');
    fireEvent.click(rowCheckboxes[1]); // Select first application

    // Check if "1 selected" text appears
    expect(screen.getByText('1 selected')).toBeInTheDocument();

    // Click "Shortlist" button
    const shortlistButton = screen.getByText('Shortlist');
    fireEvent.click(shortlistButton);

    // Verify that the row is now in the "Shortlisted Applications" table
    const shortlistedApplicationRow = screen.getAllByRole('row').find((row:any) => 
      row.textContent.includes(applicationsData[0].id)
    );
    expect(shortlistedApplicationRow).toBeInTheDocument();

    // Check if selection is cleared
    expect(screen.queryByText('1 selected')).not.toBeInTheDocument();
  });

  it('clears selection and to-shortlist list after shortlisting', () => {
    render(<RecruiterShortlists />);

    const rowCheckboxes = screen.getAllByRole('checkbox');
    fireEvent.click(rowCheckboxes[1]); // Select an application

    const shortlistButton = screen.getByText('Shortlist');
    fireEvent.click(shortlistButton);

    // Verify selectedApplications and toShortlistApplications state are cleared
    expect(screen.queryByText('1 selected')).not.toBeInTheDocument();
  });
});
