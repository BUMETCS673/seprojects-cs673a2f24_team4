
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CustomizedTreeView from 'src/components/CustomizedTreeView';
import JobCard from 'src/components/JobCard';
import Copyright from 'src/internals/components/Copyright';
import useJobListings from './useJobListings';
import styles from './ApplicantJobListings.module.css';

export const ApplicantJobListings = () => {
  const jobListings = useJobListings();

  return (
    <Box className={styles.container}>
      <Typography component="h2" variant="h6" className={styles.title}>
        Job Listings
      </Typography>
      
      <Stack direction="row" spacing={2} className={styles.stack}>
        <CustomizedTreeView />
        <Box className={styles.gridContainer}>
          <Grid container spacing={2} columns={12}>
            {jobListings.map((job, index) => (
              <Grid key={index} item xs={12} sm={6} lg={4}>
                <JobCard 
                  title={job.title} 
                  subtitle={job.company} 
                  description={`${job.location} - ${job.datePosted}`}
                  actionText="View Details"
                  onActionClick={() => console.log(`Viewing job: ${job.id}`)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>

      <Stack direction="row" justifyContent="space-between" className={styles.footerStack}>
        <Typography component="p">Showing {jobListings.length} jobs</Typography>
      </Stack>

      <Copyright className={styles.copyright} />
    </Box>
  );
};
