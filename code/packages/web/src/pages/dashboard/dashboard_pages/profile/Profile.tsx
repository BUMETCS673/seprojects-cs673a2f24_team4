import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Copyright from 'src/internals/components/Copyright';

const profileData = {
  username: 'johndoe',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  company: 'Tech Solutions',
  phone: '+1 123-456-7890',
};


export const Profile = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '800px' }, mx: 'auto', p: 3, borderRadius: 2 }}>
      <CardContent sx={{ textAlign: 'center', mb: 3 }}>
        <Avatar
          alt={profileData.firstName + ' ' + profileData.lastName}
          src="/path/to/avatar.jpg"
          sx={{ width: 120, height: 120, margin: '0 auto', mb: 2 }}
        />
        <Typography component="h2" variant="h4" fontWeight="bold">
          {profileData.firstName} {profileData.lastName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {profileData.company}
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Edit Profile
        </Button>
      </CardContent>
        <CardContent>
          <Typography variant="h6" color="primary" sx={{ mb: 2, fontWeight: 'medium' }}>
            Contact Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List disablePadding>
            <ListItem>
              <ListItemText primary="Username" secondary={profileData.username} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email" secondary={profileData.email} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Phone" secondary={profileData.phone} />
            </ListItem>
          </List>
        </CardContent>
        <CardContent>
          <Typography variant="h6" color="primary" sx={{ mb: 2, fontWeight: 'medium' }}>
            Personal Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List disablePadding>
            <ListItem>
              <ListItemText primary="First Name" secondary={profileData.firstName} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Last Name" secondary={profileData.lastName} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Company" secondary={profileData.company} />
            </ListItem>
          </List>
        </CardContent>
      <Copyright sx={{ mt: 4, textAlign: 'center' }} />
    </Box>
  );
};
