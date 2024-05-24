import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { HeadingPage } from '../../common';
import {
  notificationActions,
  selectNotifications,
} from '../../store/notification/slice';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';

function Notification() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);

  useEffect(() => {
    dispatch(notificationActions.getNotifications());
  }, [dispatch]);
  
  return (
    <div className='container'>
      <div className='px-4'>
        <HeadingPage title='Notification' />
      </div>
      <div className='flex flex-col'>
        {notifications.data.map((item: any) => (
          <Link
            to={`/order/${item.orderId}`}
            onClick={() =>
              dispatch(
                notificationActions.updateNotification(item.notificationId)
              )
            }
            className={`grid grid-cols-12 border-b py-4 px-4 ${
              item.read && 'bg-[#e3dfdf]'
            }`}
            key={uuid()}
          >
            <img
              src={item?.image}
              alt=''
              className='col-span-2 object-cover w-full aspect-square'
            />
            <div className='col-span-10 ml-4'>
              <h3 className='text-[20px]'>{item.title}</h3>
              <p className='text-[gray]'>{item.message}</p>
              <span className='text-[13px] text-[gray]'>
                {new Date(item.notificationDate).toLocaleString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false,
                }) +
                  ', ' +
                  new Date(item.notificationDate).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Notification;
