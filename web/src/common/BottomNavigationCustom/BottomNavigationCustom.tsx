import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { links } from '../../types/navBar';

export default function BottomNavigationCustom() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname || '/');

  React.useEffect(() => {
    setValue(location.pathname);
  }, [location]);

  return (
    <Box
      sx={{
        display: { xs: 'block', sm: 'none' },
        position: 'fixed',
        bottom: 0,
        left: 0,
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
  );
}
