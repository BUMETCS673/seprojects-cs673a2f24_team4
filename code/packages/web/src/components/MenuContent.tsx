import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import {
  DocumentScannerRounded,
  LoyaltyRounded,
  PersonRounded,
  ReceiptRounded,
  WorkRounded,
} from '@mui/icons-material';

const mainListItems = [
  { text: 'Analytics', icon: <AnalyticsRoundedIcon /> },
  { text: 'Resume Analysis', icon: <DocumentScannerRounded /> },
  { text: 'Job Listings', icon: <WorkRounded /> },
  { text: 'Shortlists', icon: <AssignmentRoundedIcon /> },
];

const secondaryListItems = [
  { text: 'Profile', icon: <PersonRounded /> },
  { text: 'Billing', icon: <ReceiptRounded /> },
  { text: 'Manage Subscription', icon: <LoyaltyRounded /> },
];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
