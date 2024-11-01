import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from 'src/internals/components/Copyright';
import ChartUserByCountry from 'src/components/ChartUserByCountry';
import CustomizedTreeView from 'src/components/CustomizedTreeView';
import CustomizedDataGrid from 'src/components/CustomizedDataGrid';
import HighlightedCard from 'src/components/HighlightedCard';
import PageViewsBarChart from 'src/components/PageViewsBarChart';
import SessionsChart from 'src/components/SessionsChart';
import StatCard, { StatCardProps } from 'src/components/StatCard';

const data: StatCardProps[] = [
  {
    title: 'Resumes Shortlisted',
    value: '350',
    interval: 'Last 30 days',
    trendText: '+600%',
    trend: 'up',
    data: [
      5, 6, 7, 8, 9, 10, 10, 11, 12, 12, 13, 13, 14, 15, 15, 16, 17, 18, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 30,
    ],
  },
  {
    title: 'Jobs Listed',
    value: '73',
    interval: 'Last 30 days',
    trendText: '+2%',
    trend: 'up',
    data: [
      1, 2, 1, 3, 2, 4, 1, 5, 3, 6, 5, 3, 6, 4, 7, 3, 6, 8, 6, 8, 7, 4, 8, 5, 9, 6,
      2, 3, 2, 2,
    ],
  },
  {
    title: 'Applications Received',
    value: '1768',
    interval: 'Last 30 days',
    trendText: '0%',
    trend: 'neutral',
    data: [
      58, 60, 59, 62, 59, 60, 57, 61, 60, 59, 60, 58, 59, 57, 58, 60, 59, 58, 60, 61,
      58, 59, 60, 57, 58, 59, 57, 58, 57, 58,
    ],
  },
];

export const RecruiterAnalytics = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
};
