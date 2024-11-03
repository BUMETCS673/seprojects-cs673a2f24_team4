import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Copyright from 'src/internals/components/Copyright';

const profileData = {
  id: '12345',
  username: 'johndoe',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  company: 'Tech Solutions Inc.',
  phone: '+1 123-456-7890',
};

const Profile = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '600px' }, mx: 'auto', p: 2 }}>
      <Typography component="h2" variant="h4" sx={{ mb: 3 }}>
        Profile Information
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <List>
            <ListItem>
              <ListItemText primary="ID" secondary={profileData.id} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Username" secondary={profileData.username} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email" secondary={profileData.email} />
            </ListItem>
            <ListItem>
              <ListItemText primary="First Name" secondary={profileData.firstName} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Last Name" secondary={profileData.lastName} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Company" secondary={profileData.company} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Phone" secondary={profileData.phone} />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <Copyright sx={{ mt: 4 }} />
    </Box>
  );
};

export default Profile;
