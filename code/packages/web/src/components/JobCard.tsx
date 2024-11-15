// JobCard.tsx
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import styles from './JobCard.module.css';

type JobCardProps = {
  title: string;
  subtitle: string;
  description: string;
  actionText: string;
  onActionClick: () => void;
};

export default function JobCard({
  title,
  subtitle,
  description,
  actionText,
  onActionClick,
}: JobCardProps) {
  return (
    <Card variant="outlined" className={styles.card}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {subtitle}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className={styles.description}
        >
          {description}
        </Typography>
        <Box className={styles.buttonBox}>
          <Button variant="contained" onClick={onActionClick}>
            {actionText}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
