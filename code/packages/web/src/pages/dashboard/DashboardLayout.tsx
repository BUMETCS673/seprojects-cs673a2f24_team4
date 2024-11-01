import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from 'src/components/AppNavbar';
import Header from 'src/components/Header';
import SideMenu from 'src/components/SideMenu';
import AppTheme from 'src/theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from 'src/theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

interface DashboardLayoutProps {
  disableCustomTheme?: boolean;
  element: JSX.Element;
}

const DashboardLayout = ({ disableCustomTheme, element }: DashboardLayoutProps) => {
  return (
    <AppTheme
      disableCustomTheme={disableCustomTheme}
      themeComponents={xThemeComponents}
    >
      <CssBaseline enableColorScheme />
      <Box sx={{ width: '100%', display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            width: '100%',
            backgroundColor: alpha(theme.palette.background.default, 1),
            overflow: 'scroll',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            {element}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
};

export default DashboardLayout;
