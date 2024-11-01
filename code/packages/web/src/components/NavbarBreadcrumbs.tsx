import { useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useLocation } from 'react-router-dom';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: theme.palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

const getPathSegments = (path: string): string[] => {
  return path.replace(/^\/|\/$/g, '').split('/');
};

function capitalizeFirstLetters(segments: string[]): string[] {
  return segments.map(
    (segment) => segment.charAt(0).toUpperCase() + segment.slice(1),
  );
}

export default function NavbarBreadcrumbs() {
  const location = useLocation();

  const pathSegments = useMemo(() => {
    const segment = getPathSegments(location.pathname);
    return capitalizeFirstLetters(segment);
  }, [location.pathname]);

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {pathSegments.map((segment, i) => {
        const isLastSegment = i === pathSegments.length - 1;

        return (
          <Typography
            key={i}
            variant="body1"
            sx={
              isLastSegment ? { color: 'text.primary', fontWeight: 600 } : undefined
            }
          >
            {segment}
          </Typography>
        );
      })}
    </StyledBreadcrumbs>
  );
}
