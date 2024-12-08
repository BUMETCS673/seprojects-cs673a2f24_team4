import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Copyright from 'src/internals/components/Copyright';
import avatar from 'src/assets/avatar.jpg';
import './Profile.css';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';

interface ProfileData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
}

export const Profile: React.FC = () => {
  // State for profile data

  const userDetails = useAppSelector((state: RootState) => state.me);
  const [profileData, setProfileData] = useState<ProfileData>({
    username: 'johndoe',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    company: 'Tech Solutions',
    phone: '+1 123-456-7890',
  });

  // State for form data in the modal
  const [formData, setFormData] = useState<ProfileData>(profileData);

  // State to control modal open/close
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setFormData(profileData); // Initialize form data with current profile data
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = () => {
    setProfileData(formData); // Update profile data with form data
    handleClose();
  };

  return (
    <Box className="profileContainer">
      <CardContent className="cardContentCentered">
        <Avatar
          src={avatar}
          alt={`${userDetails.response?.user.firstName} ${userDetails.response?.user.lastName}`}
          className="avatar"
        />
        <Typography component="h2" variant="h4" fontWeight="bold">
          {userDetails.response?.user.firstName}{' '}
          {userDetails.response?.user.lastName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {userDetails.response?.user.company}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="editButton"
          onClick={handleOpen}
        >
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
            <ListItemText
              primary="Username"
              secondary={userDetails.response?.user.username}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Email"
              secondary={userDetails.response?.user.email}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Phone"
              secondary={userDetails.response?.user.phone}
            />
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
            <ListItemText
              primary="First Name"
              secondary={userDetails.response?.user.firstName}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Last Name"
              secondary={userDetails.response?.user.lastName}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Company"
              secondary={userDetails.response?.user.company}
            />
          </ListItem>
        </List>
      </CardContent>

      {/* Modal for editing profile */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone"
            type="tel"
            fullWidth
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Company"
            type="text"
            fullWidth
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Copyright className="copyright" />
    </Box>
  );
};
