import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import styles from './ApplicantJobListings.module.css';
import useJobListings from './useJobListings';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/react_router/routes';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';

export const ApplicantJobListings = () => {
  const { jobListings, deleteJobListing } = useJobListings();
  const userDetails = useAppSelector((state: RootState) => state.me);
  const userGroup = userDetails.response?.user?.group
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const goToJobDetails = (jobId: string) => () => {
    navigate(ROUTES.jobDetails.replaceAll(':jobId', jobId));
  };

  const handleDeleteClick = (jobId: string) => () => {
    setSelectedJobId(jobId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedJobId) {
      deleteJobListing(selectedJobId);
      setOpenDialog(false);
      setSelectedJobId(null);
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setSelectedJobId(null);
  };

  const goToCreateJobListing = () => {
    navigate(ROUTES.createJob); // Replace with the actual route
  };

  return (
    <Box className={styles.container}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography component="h2" variant="h6" className={styles.title}>
          Job Listings
        </Typography>
        {userGroup=="recruiter" ? (<Button
          variant="contained"
          className={styles.createButton}
          onClick={goToCreateJobListing}
        >
          + Create Job Listing
        </Button>):<></>}
      </Stack>

      <Box className={styles.listContainer}>
        {jobListings.map((job: any) => (
          <React.Fragment key={job.id}>
            <Box className={styles.row}>
              <Box className={styles.jobInfo}>
                <Typography variant="subtitle1" className={styles.jobTitle}>
                  {job.title}
                </Typography>
                <Typography variant="body2" className={styles.jobSubtitle}>
                  {job.coreRequirements}
                </Typography>
              </Box>
              <Box className={styles.actions}>
                <Button
                  variant="text"
                  onClick={goToJobDetails(job.id)}
                  className={styles.viewButton}
                >
                  View Details
                </Button>
                <Button
                  variant="text"
                  onClick={handleDeleteClick(job.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </Button>
              </Box>
            </Box>
            <Divider className={styles.divider} />
          </React.Fragment>
        ))}
      </Box>

      <Stack
        direction="row"
        justifyContent="space-between"
        className={styles.footerStack}
      >
        <Typography component="p">Showing {jobListings.length} jobs</Typography>
      </Stack>

      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle className={styles.dialogTitle}>Confirm Delete</DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <Typography className={styles.dialogText}>
            Are you sure you want to delete this job listing?
          </Typography>
        </DialogContent>
        <DialogActions className={styles.dialogActions}>
          <Button onClick={handleCancelDelete} className={styles.cancelButton}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            className={styles.confirmButton}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
