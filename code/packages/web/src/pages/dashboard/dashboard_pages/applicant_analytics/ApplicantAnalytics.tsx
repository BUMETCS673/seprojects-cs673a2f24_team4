import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getLast7Days } from 'src/utils/DateTimeUtils';
import { Copyright } from '@mui/icons-material';
import ChartApplicantByCountry from 'src/components/chart_applicant_by_country/ChartApplicantByCountry';
import CustomizedTreeView from 'src/components/customized_tree_view/CustomizedTreeView';
import HighlightedCard from 'src/components/highlighted_card/HighlightedCard';
import ResumeScoreChart from 'src/components/resume_score_chart/ResumeScoreChart';
import ResumeUploadsBarChart from 'src/components/resume_uploads_bar_chart/ResumeUploadsBarChart';
import ResumeUploadsDataGrid from 'src/components/resume_uploads_data_grid/ResumeUploadsDataGrid';
import StatCard, { StatCardProps } from 'src/components/stat_card/StatCard';

const last7Days = getLast7Days();

const data: StatCardProps[] = [
  {
    title: 'Resumes Analyzed',
    value: '17',
    interval: 'Last 7 days',
    trendText: '-30%',
    trend: 'down',
    data: [13, 9, 10, 12, 11, 12, 9],
    xAxis: last7Days,
  },
  {
    title: 'Overall Resume Score',
    value: '92',
    interval: 'Last 7 days',
    trendText: '+68',
    trend: 'up',
    data: [24, 46, 66, 62, 78, 86, 92],
    xAxis: last7Days,
  },
  {
    title: 'Jobs Applied',
    value: '54',
    interval: 'Last 7 days',
    trendText: '+0.6%',
    trend: 'neutral',
    data: [10, 0, 8, 5, 0, 12, 19],
    xAxis: last7Days,
  },
];

export const ApplicantAnalytics = () => {
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
          <HighlightedCard
            heading="Analyze Resume"
            subHeading="Use our powerful AI to analyze your resume"
            buttonText="Upload Resume"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ResumeScoreChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ResumeUploadsBarChart />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Resume Uploads
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <ResumeUploadsDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView />
            <ChartApplicantByCountry />
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
};
