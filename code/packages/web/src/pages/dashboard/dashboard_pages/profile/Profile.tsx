import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Copyright from 'src/internals/components/Copyright';

const profileData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 123-456-7890',
  address: '123 Main Street, Cityville, USA',
  resumeScore: 85,
  skills: ['JavaScript', 'React', 'Node.js', 'CSS', 'TypeScript'],
  experience: [
    {
      company: 'Tech Solutions Inc.',
      role: 'Frontend Developer',
      duration: 'Jan 2020 - Present',
      description: 'Developed and maintained web applications with a focus on user experience and performance.',
    },
    {
      company: 'Creative Agency',
      role: 'Junior Developer',
      duration: 'Aug 2017 - Dec 2019',
      description: 'Worked on multiple client projects, contributing to UI/UX improvements and feature development.',
    },
  ],
  education: [
    {
      institution: 'State University',
      degree: 'Bachelor of Science in Computer Science',
      duration: '2013 - 2017',
    },
  ],
};

export const ProfilePage = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1200px' }, mx: 'auto', p: 2 }}>
      <Typography component="h2" variant="h4" sx={{ mb: 3 }}>
        Profile
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Avatar sx={{ width: 128, height: 128, mb: 2 }} src="/path/to/dummy/avatar.jpg" alt={profileData.name} />
              <Typography variant="h5">{profileData.name}</Typography>
              <Typography variant="body1" color="text.secondary">
                {profileData.email}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {profileData.phone}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {profileData.address}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Resume Score
              </Typography>
              <Typography variant="h4" color="primary">
                {profileData.resumeScore}%
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                Skills
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {profileData.skills.map((skill, index) => (
                  <Box key={index} sx={{ px: 2, py: 1, bgcolor: 'primary.light', borderRadius: 1, mb: 1 }}>
                    {skill}
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Typography component="h3" variant="h5" sx={{ mb: 2 }}>
        Experience
      </Typography>
      <List sx={{ mb: 3 }}>
        {profileData.experience.map((job, index) => (
          <ListItem key={index} alignItems="flex-start" sx={{ mb: 2 }}>
            <ListItemText
              primary={`${job.role} at ${job.company}`}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="text.primary">
                    {job.duration}
                  </Typography>
                  <br />
                  {job.description}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
      <Typography component="h3" variant="h5" sx={{ mb: 2 }}>
        Education
      </Typography>
      <List>
        {profileData.education.map((edu, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemText
              primary={edu.degree}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="text.primary">
                    {edu.institution}
                  </Typography>
                  <br />
                  {edu.duration}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
      <Copyright sx={{ mt: 4 }} />
    </Box>
  );
};
