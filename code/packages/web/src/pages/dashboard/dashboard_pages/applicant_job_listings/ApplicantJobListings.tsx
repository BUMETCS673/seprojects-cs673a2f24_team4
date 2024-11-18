import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import JobCard from 'src/components/JobCard';
import Copyright from 'src/internals/components/Copyright';
import styles from './ApplicantJobListings.module.css';
import useJobListings from './useJobListings';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/react_router/routes';

export const ApplicantJobListings = () => {
  const jobListings = useJobListings();
  const navigate = useNavigate();

  const goToJobDetails = (jobId: string) => () => {
    navigate(ROUTES.jobDetails.replaceAll(':jobId', jobId));
  };

  return (
    <Box className={styles.container}>
      <Typography component="h2" variant="h6" className={styles.title}>
        Job Listings
      </Typography>

      <Stack direction="row" spacing={2} className={styles.stack}>
        <Box className={styles.gridContainer}>
          <Grid container spacing={2} columns={12}>
            {jobListings.map((job: any, index) => (
              <Grid key={index} item xs={12} sm={6} lg={4}>
                <JobCard
                  title={job.title}
                  subtitle={job.coreRequirements}
                  actionText="View Details"
                  onActionClick={goToJobDetails(job.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>

      <Stack
        direction="row"
        justifyContent="space-between"
        className={styles.footerStack}
      >
        <Typography component="p">Showing {jobListings.length} jobs</Typography>
      </Stack>

      <Copyright className={styles.copyright} />
    </Box>
  );
};
