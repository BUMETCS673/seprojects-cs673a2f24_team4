import React from 'react';
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
import avatar from 'src/assets/avatar.jpg';
import './Profile.css';

interface ProfileData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
}

const profileData: ProfileData = {
  username: 'johndoe',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  company: 'Tech Solutions',
  phone: '+1 123-456-7890',
};

export const Profile: React.FC = () => {
  return (
    <Box className="profileContainer">
      <CardContent className="cardContentCentered">
        <Avatar
          src={avatar}
          alt={`${profileData.firstName} ${profileData.lastName}`}
          className="avatar"
        />
        <Typography component="h2" variant="h4" fontWeight="bold">
          {profileData.firstName} {profileData.lastName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {profileData.company}
        </Typography>
        <Button variant="contained" color="primary" className="editButton">
          Edit Profile
        </Button>
      </CardContent>
      <CardContent>
        <Typography variant="h6" color="primary" className="sectionTitle">
          Contact Information
        </Typography>
        <Divider className="divider" />
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
        <Typography variant="h6" color="primary" className="sectionTitle">
          Personal Details
        </Typography>
        <Divider className="divider" />
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
      <Copyright className="copyright" />
    </Box>
  );
};
