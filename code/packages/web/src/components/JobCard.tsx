import { Card, CardContent, Typography, Button, Box } from '@mui/material';

type JobCardProps = {
  title: string;
  subtitle: string;
  description: string;
  actionText: string;
  onActionClick: () => void;
};

export default function JobCard({ title, subtitle, description, actionText, onActionClick }: JobCardProps) {
  return (
    <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {subtitle}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Box mt={2}>
          <Button variant="contained" onClick={onActionClick}>
            {actionText}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
