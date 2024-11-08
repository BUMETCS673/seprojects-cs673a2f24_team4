import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import { Checkbox } from '@mui/material';
import { useMemo, useState } from 'react';
import { LineSeriesType } from '@mui/x-charts';
import { MakeOptional } from '@mui/x-charts/internals';

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

export default function ResumeScoreChart() {
  const [impactChecked, setImpactChecked] = useState(true);
  const [presentationChecked, setPresentationChecked] = useState(true);
  const [competencyChecked, setCompetencyChecked] = useState(true);
  const theme = useTheme();
  const data = getDaysInMonth(4, 2024);

  const seriesData: MakeOptional<LineSeriesType, 'type'>[] = useMemo(() => {
    const data: MakeOptional<LineSeriesType, 'type'>[] = [];

    if (impactChecked) {
      data.push({
        id: 'impact',
        label: 'Impact',
        showMark: false,
        curve: 'linear',
        stack: 'total',
        area: true,
        stackOrder: 'ascending',
        data: [
          300, 900, 600, 1200, 1500, 1800, 2400, 2100, 2700, 3000, 1800, 3300, 3600,
          3900, 4200, 4500, 3900, 4800, 5100, 5400, 4800, 5700, 6000, 6300, 6600,
          6900, 7200, 7500, 7800, 8100,
        ],
      });
    }

    if (presentationChecked) {
      data.push({
        id: 'presentation',
        label: 'Presentation',
        showMark: false,
        curve: 'linear',
        stack: 'total',
        area: true,
        stackOrder: 'ascending',
        data: [
          500, 900, 700, 1400, 1100, 1700, 2300, 2000, 2600, 2900, 2300, 3200, 3500,
          3800, 4100, 4400, 2900, 4700, 5000, 5300, 5600, 5900, 6200, 6500, 5600,
          6800, 7100, 7400, 7700, 8000,
        ],
      });
    }

    if (competencyChecked) {
      data.push({
        id: 'competency',
        label: 'competency',
        showMark: false,
        curve: 'linear',
        stack: 'total',
        area: true,
        stackOrder: 'ascending',
        data: [
          1000, 1500, 1200, 1700, 1300, 2000, 2400, 2200, 2600, 2800, 2500, 3000,
          3400, 3700, 3200, 3900, 4100, 3500, 4300, 4500, 4000, 4700, 5000, 5200,
          4800, 5400, 5600, 5900, 6100, 6300,
        ],
      });
    }

    return data;
  }, [impactChecked, presentationChecked, competencyChecked]);

  const colorPalette = useMemo(() => {
    const colors = [];
    if (impactChecked) {
      colors.push(theme.palette.warning.light);
    }

    if (presentationChecked) {
      colors.push(theme.palette.info.light);
    }

    if (competencyChecked) {
      colors.push(theme.palette.success.light);
    }

    return colors;
  }, [impactChecked, presentationChecked, competencyChecked]);

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Resume Score Breakdown
        </Typography>
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-around',
            alignContent: { xs: 'center', sm: 'flex-start' },
            alignItems: 'center',
            marginTop: 1,
            marginBottom: 1,
          }}
        >
          <Stack
            direction="row"
            sx={{ alignItems: 'center', alignContent: 'flex-start' }}
          >
            <Checkbox
              checked={impactChecked}
              color="warning"
              onClick={() => setImpactChecked(!impactChecked)}
            />
            <Typography variant="subtitle2">Impact</Typography>
          </Stack>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', alignContent: 'flex-start' }}
          >
            <Checkbox
              checked={presentationChecked}
              color="info"
              onClick={() => setPresentationChecked(!presentationChecked)}
            />
            <Typography variant="subtitle2">Presentation</Typography>
          </Stack>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', alignContent: 'flex-start' }}
          >
            <Checkbox
              checked={competencyChecked}
              color="success"
              onClick={() => setCompetencyChecked(!competencyChecked)}
            />
            <Typography variant="subtitle2">Competency</Typography>
          </Stack>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data,
              tickInterval: (_index, i) => (i + 1) % 5 === 0,
            },
          ]}
          series={seriesData}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-competency': {
              fill: "url('#competency')",
            },
            '& .MuiAreaElement-series-presentation': {
              fill: "url('#presentation')",
            },
            '& .MuiAreaElement-series-impact': {
              fill: "url('#impact')",
            },
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        >
          {competencyChecked && (
            <AreaGradient color={theme.palette.success.light} id="competency" />
          )}
          {presentationChecked && (
            <AreaGradient color={theme.palette.info.light} id="presentation" />
          )}
          {impactChecked && (
            <AreaGradient color={theme.palette.warning.light} id="impact" />
          )}
        </LineChart>
      </CardContent>
    </Card>
  );
}
