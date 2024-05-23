import { Button, Skeleton } from '@mui/material';
import convertDate from '../../utils/helpers/convertDate';
import { statusDefault } from '../../utils/constants/status';
import { useNavigate } from 'react-router-dom';

function OrderList({ order }: { order: any }) {
  const navigate = useNavigate();

  return (
    <div
      className='flex flex-col gap-4 overflow-scroll'
      style={{ height: 'calc(100vh - 150px)' }}
    >
      {order.status === 'loading'
        ? Array.from({ length: 4 }).map(() => (
            <div
              key={Math.random()}
              className='flex flex-col p-4 m-1 shadow-md rounded-sm bg-white'
            >
              <div className='flex justify-between pb-[10px] border-b-2 mb-[15px]'>
                <Skeleton width={100} />
                <Skeleton width={100} />
              </div>
              <div className='flex justify-between'>
                <div className=''>
                  <Skeleton width={100} />
                </div>
                <Skeleton width={100} />
              </div>
              <div className='flex justify-between'>
                <Skeleton width={100} />
                <Skeleton width={100} />
              </div>
            </div>
          ))
        : order.data.map((orderItem: any) => (
            <div
              key={orderItem.orderId}
              className='flex flex-col p-4 m-1 shadow-md rounded-sm bg-white'
            >
              <div className='flex justify-between pb-[10px] border-b-2 mb-[15px]'>
                <span className=''>Order: {orderItem.orderId}</span>
                <span className='text-[14px] text-[#909090]'>
                  {convertDate(orderItem.orderDate)}
                </span>
              </div>
              <div className='flex justify-between'>
                <div className=''>
                  <span className='text-[#909090]'>Quantity: </span>
                  <span>{orderItem.quantity}</span>
                </div>
                <span className='mb-[30px]'>
                  <span className='text-[#909090]'>Total: </span>
                  <span>${orderItem.total}</span>
                </span>
              </div>
              <div className='flex justify-between'>
                <Button
                  sx={{ fontSize: '16px' }}
                  variant='contained'
                  onClick={() => navigate(`/order/${orderItem.orderId}`)}
                >
                  Detail
                </Button>
                <span className='text-[#27AE60]'>
                  {
                    statusDefault.find(
                      (item: any) => item.id === orderItem.orderStatus
                    )?.name
                  }
                </span>
              </div>
            </div>
          ))}
    </div>
  );
}

export default OrderList;
