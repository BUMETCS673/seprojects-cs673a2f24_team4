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
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/react_router/routes';
import { useCallback, useEffect } from 'react';
import { RootState } from 'src/redux/store';
import { getMe } from 'src/redux/slices/meSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';

type ListItem = {
  text: string;
  icon: React.ReactElement;
  path: string;
};

const mainListItems: ListItem[] = [
  // { text: 'Analytics', icon: <AnalyticsRoundedIcon />, path: ROUTES.analytics },
  { text: 'Job Listings', icon: <WorkRounded />, path: ROUTES.jobListings },
  // { text: 'Shortlists', icon: <AssignmentRoundedIcon />, path: ROUTES.shortlists },
];

const secondaryListItems: ListItem[] = [
  { text: 'Profile', icon: <PersonRounded />, path: ROUTES.profile },
  { text: 'Billing', icon: <ReceiptRounded />, path: ROUTES.billing },
  {
    text: 'Manage Subscription',
    icon: <LoyaltyRounded />,
    path: ROUTES.subscription,
  },
];

export default function MenuContent() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMe);
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const userDetails = useAppSelector((state: RootState) => state.me);
  const userGroup = userDetails.response?.user?.group;
  const exists = mainListItems.some((item) => item.text == 'Resume Analysis');
  if (userGroup && userGroup !== 'recruiter' && !exists) {
    console.log(userGroup);
    mainListItems.push({
      text: 'Resume Analysis',
      icon: <DocumentScannerRounded />,
      path: ROUTES.resumeAnalysis,
    });
  }

  const menuSelection = useCallback((item: ListItem) => {
    navigate(item.path);
  }, []);

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => menuSelection(item)}
              selected={location.pathname == item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => menuSelection(item)}
              selected={location.pathname == item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
