import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import * as React from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectHiddenNavHeader } from '../../store/common/slice';
import {
  notificationActions,
  selectNotifications,
} from '../../store/notification/slice';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import { selectUser } from '../../store/user/slice';
import { links } from '../../types/navBar';
import useSocket from '../../utils/hooks/useSocket';

export default function BottomNavigationCustom() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname || '/');

  const hiddenNavHeader = useAppSelector(selectHiddenNavHeader);
  const notification = useAppSelector(selectNotifications);

  React.useEffect(() => {
    setValue(location.pathname);
  }, [location]);

  const socket = useSocket('http://localhost:3001');
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  React.useEffect(() => {
    if (!socket) return;
    socket.on('orderUpdate', (data: any) => {
      toast(data.title, {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      dispatch(notificationActions.getNotifications());
    });

    return () => {
      socket.off('orderUpdate');
    };
  }, [dispatch, socket]);

  React.useEffect(() => {
    if (!user.data.userId) return;
    dispatch(notificationActions.getNotifications());
  }, [dispatch, user.data.userId]);

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
              icon={
                link.name === 'Notification' ? (
                  <div style={{ position: 'relative' }}>
                    <link.icon />
                    <span
                      style={{
                        position: 'absolute',
                        top: -5,
                        right: -5,
                        background: 'red',
                        color: 'white',
                        borderRadius: '50%',
                        height: '15px',
                        width: '15px',
                        fontSize: '10px',
                      }}
                    >
                      {notification.count}
                    </span>
                  </div>
                ) : (
                  <link.icon />
                )
              }
            />
          ))}
        </BottomNavigation>
      </Box>
    )
  );
}
