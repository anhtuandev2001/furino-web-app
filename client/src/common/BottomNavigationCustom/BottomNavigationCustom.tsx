import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { links } from '../../types/navBar';
import { useAppSelector } from '../../store/root/hooks';
import { selectHiddenNavHeader } from '../../store/common/slice';

export default function BottomNavigationCustom() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname || '/');

  const hiddenNavHeader = useAppSelector(selectHiddenNavHeader);

  React.useEffect(() => {
    setValue(location.pathname);
  }, [location]);

  return (
    !hiddenNavHeader && (
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'fixed',
          bottom: 0,
          left: 0,
          zIndex: 1000,
          right: 0,
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_event, newValue) => {
            setValue(newValue);
            navigate(newValue);
          }}
        >
          {links.map((link) => (
            <BottomNavigationAction
              key={link.name}
              label={link.name}
              value={link.path}
              icon={<link.icon />}
            />
          ))}
        </BottomNavigation>
      </Box>
    )
  );
}
