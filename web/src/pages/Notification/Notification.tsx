import { HeadingPage } from '../../common';
import { v4 as uuid } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import { useEffect } from 'react';
import {
  notificationActions,
  selectNotifications,
} from '../../store/notification/slice';
import useSocket from '../../utils/hooks/useSocket';

function Notification() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);

  const socket = useSocket('http://localhost:3001');

  useEffect(() => {
    if (!socket) return;
    socket.on('orderUpdate', (data: any) => {
      console.log('Order Update:', data);
    });

    return () => {
      socket.off('orderUpdate');
    };
  }, [socket]);

  useEffect(() => {
    dispatch(notificationActions.getNotifications());
  }, [dispatch]);
  return (
    <div className='container'>
      <HeadingPage title='Notification' />
      <div className='flex flex-col gap-4'>
        {notifications.data.map((item: any) => (
          <div
            className='grid grid-cols-12 border-b pb-4'
            key={uuid()}
          >
            <img
              src={item}
              alt=''
              className='col-span-2 object-cover w-full aspect-square'
            />
            <div className='col-span-10 ml-4'>
              <h3 className='text-[20px]'>{item.title}</h3>
              <p className='text-[gray]'>{item.message}</p>
              <span className='text-[13px] text-[gray]'>
                {item.notificationDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
