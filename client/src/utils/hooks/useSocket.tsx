import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { selectUser } from '../../store/user/slice';
import { useAppSelector } from '../../store/root/hooks';

const useSocket = (url: string) => {
  const user = useAppSelector(selectUser);
  const socketRef = useRef<any>();
  useEffect(() => {
    if (!user.data.userId) {
      return;
    }
    socketRef.current = io(url);

    socketRef.current.on('connect', () => {
      console.log('Connected to server');
      socketRef.current.emit('register', user.data.userId);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [url, user.data.userId]);

  return socketRef.current;
};

export default useSocket;
