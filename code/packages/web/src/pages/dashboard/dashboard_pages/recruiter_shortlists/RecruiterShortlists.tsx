import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ResumeUploadsDataGrid from 'src/components/ResumeUploadsDataGrid';
import { applicationDataColumns, applicationsData } from 'src/internals/data/gridData';
import { DataGrid } from '@mui/x-data-grid';
import { resumeDataColumns, resumeDataRows } from '../../../../internals/data/gridData';

export const RecruiterShortlists = () => {
  // State to store shortlisted applications
  const [shortlistedApplications, setShortlistedApplications] = useState([]);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [toShortlistApplications, setToShortlistApplications] = useState([]);

  // Use applicationsData as the source for the Job Applications table
  const jobApplicationsData = applicationsData;

  // Handle row selection in Job Applications table
  const handleRowSelection = (selectedRows:any) => {
    const filteredRows:any = applicationsData.filter(row => selectedRows.includes(row.id));
    setToShortlistApplications(filteredRows);
    setSelectedApplications(selectedRows);
  };

  // Handle click on "Shortlist" button to add selected rows to shortlist
  const handleShortlist = () => {
    setShortlistedApplications((prev) => [...prev, ...toShortlistApplications]);
    setSelectedApplications([]); // Clear selection after shortlisting
    setToShortlistApplications([]); 
  };


  return (
    <Box sx={{ width: '100%', maxWidth: '1700px' }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Job Applications
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
      {selectedApplications.length > 0 && (
          <Grid size={{ xs: 12, lg: 3 }} display="flex" alignItems="center">
            <Typography variant="body1" sx={{ mr: 2 }}>
              {selectedApplications.length} selected
            </Typography>
            <Button variant="contained" color="primary" onClick={handleShortlist}>
              Shortlist
            </Button>
          </Grid>
        )}
</Stack>
      {/* Job Applications Table with Shortlist Button */}
      <Grid container spacing={2} columns={12} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, lg: 9 }}>
        <DataGrid
      autoHeight
      checkboxSelection
      rows={applicationsData}
      columns={applicationDataColumns}
      onRowSelectionModelChange={handleRowSelection}
      rowSelectionModel={selectedApplications}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
    />
        </Grid>
        
      </Grid>

      {/* Shortlisted Applications Table */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Shortlisted Applications
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
        <DataGrid
      autoHeight
      rows={shortlistedApplications}
      columns={applicationDataColumns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
    />
        </Grid>
      </Grid>
    </Box>
  );
};
