import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

export default function ResumeUploadsBarChart() {
  const theme = useTheme();

  const colorPalette = [theme.palette.primary.main, theme.palette.primary.light];
  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Resume uploads
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              52
            </Typography>
            <Chip size="small" color="error" label="-16%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Resume upload history for the last 6 months
          </Typography>
        </Stack>
        <BarChart
          borderRadius={4}
          colors={colorPalette}
          xAxis={
            [
              {
                scaleType: 'band',
                categoryGapRatio: 0.5,
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
              },
            ] as any
          }
          yAxis={[
            {
              max: 100,
            },
          ]}
          series={[
            {
              id: 'single-resume',
              label: 'Resume Uploads',
              data: [22, 38, 29, 41, 33, 27, 29],
              stack: 'A',
            },
            {
              id: 'resume-with-job-descriptions',
              label: 'Resume w/ Job Desc',
              data: [30, 42, 23, 21, 47, 35, 23],
              stack: 'A',
            },
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
