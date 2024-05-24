import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { notificationActions } from '../store/notification/slice';
import { useAppDispatch } from '../store/root/hooks';
import useSocket from '../utils/hooks/useSocket';

function NotificationSocket() {
  const socket = useSocket('http://localhost:3001');
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('hihi');
    
    if (!socket) return;
    socket.on('orderUpdate', (data: any) => {
      console.log('Order Update:', data);
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

  useEffect(() => {
    dispatch(notificationActions.getNotifications());
  }, [dispatch]);
  return null;
}

export default NotificationSocket;
