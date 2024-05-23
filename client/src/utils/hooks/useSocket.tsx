// useSocket.js
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const useSocket = (url: string) => {
  const socketRef = useRef<any>();
  useEffect(() => {
    // Khởi tạo socket.io client và kết nối với server
    socketRef.current = io(url);

    // Lắng nghe sự kiện kết nối
    socketRef.current.on('connect', () => {
      console.log('Connected to server');
    });

    // Lắng nghe sự kiện ngắt kết nối
    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Cleanup khi component unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, [url]);

  return socketRef.current;
};

export default useSocket;
