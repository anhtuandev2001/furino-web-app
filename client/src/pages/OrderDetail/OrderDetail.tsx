import LoadingButton from '@mui/lab/LoadingButton';
import { Skeleton } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { HeaderMobile } from '../../common';
import {
  orderActions,
  selectOrder,
  selectStatus,
} from '../../store/order/slice';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import AlertDialog from '../../common/AlertDialog/AlertDialog';

function OrderDetail() {
  const [open, setOpen] = React.useState(false);

  const order = useAppSelector(selectOrder);
  const dispatch = useAppDispatch();
  const orderId = useParams().orderId;
  useEffect(() => {
    dispatch(orderActions.getOrder(Number(orderId)));
  }, [dispatch, orderId]);

  const { data, status } = order;
  const statusUpdate = useAppSelector(selectStatus);
  const delivery = 5.0;

  return (
    <div className='container px-4'>
      <HeaderMobile title='Order Detail' />
      {status === 'loading' ? (
        <div className='flex flex-col gap-[30px]'>
          <div className=''>
            <h2 className='text-[#909090] text-[18px] mb-[20px]'>
              Shipping Address
            </h2>
            <div className='shadow-md rounded-xl mt-[20px]'>
              <div className='flex justify-between py-[10px] px-[20px] border-b-4 border-[#F0F0F0]'>
                <Skeleton width={100} />
                <Skeleton width={100} />
              </div>
              <div className='py-[10px] px-[20px]'>
                <Skeleton width={100} />
              </div>
            </div>
          </div>
          <div className=''>
            <h2 className='text-[#909090] text-[18px] mb-[20px] '>Product</h2>
            <div className='overflow-scroll shadow-md rounded-xl mt-[20px]'>
              {Array.from({ length: 2 }).map(() => (
                <div
                  key={uuid()}
                  className='flex gap-7 p-4 border-b-4 border-[#F0F0F0]'
                >
                  <Skeleton
                    variant='rectangular'
                    width={100}
                    height={100}
                  />
                  <div className='flex-1'>
                    <Skeleton width={100} />
                    <div className='flex flex-col'>
                      <Skeleton width={100} />
                      <Skeleton width={100} />
                    </div>
                  </div>
                  <Skeleton width={100} />
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col justify-between p-4 shadow-md rounded-xl'>
            <div className='flex justify-between'>
              <span className='text-[#909090] text-[18px]'>Order:</span>
              <Skeleton width={100} />
            </div>
            <div className='flex justify-between'>
              <span className='text-[#909090] text-[18px]'>Delivery:</span>
              <Skeleton width={100} />
            </div>
            <div className='flex justify-between'>
              <span className='text-[#909090] text-[18px]'>Total:</span>
              <Skeleton width={100} />
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-[30px]'>
          <div className=''>
            <h2 className='text-[#909090] text-[18px] mb-[20px]'>
              Shipping Address
            </h2>
            <div className='shadow-md rounded-xl mt-[20px]'>
              <div className='flex justify-between py-[10px] px-[20px] border-b-4 border-[#F0F0F0]'>
                <span className='text-[18px]'>
                  {data.lastName + ' ' + data.firstName}
                </span>
                <span>{data.phone}</span>
              </div>
              <div className='py-[10px] px-[20px]'>
                <p className='text-[#909090]'>
                  {`${data.address}, ${data.ward}, ${data.district}, ${data.province}`}
                </p>
              </div>
            </div>
          </div>
          <div className=''>
            <h2 className='text-[#909090] text-[18px] mb-[20px] '>Product</h2>
            <div className='overflow-scroll shadow-md rounded-xl mt-[20px]'>
              {data.orderItems &&
                data.orderItems.map((orderItem: any) => (
                  <div
                    key={uuid()}
                    className='flex gap-7 p-4 border-b-4 border-[#F0F0F0]'
                  >
                    <img
                      src={orderItem.product.productImages}
                      alt='orderItem image'
                      className='h-[100px] w-[100px]'
                    />
                    <div className='flex-1'>
                      <span>{orderItem.product.name}</span>
                      <div className='flex flex-col'>
                        <span>{`${orderItem.productColor.name}, ${orderItem.productSize.name}`}</span>
                        <span>x{orderItem.quantity}</span>
                      </div>
                    </div>
                    <span>{orderItem.price}$</span>
                  </div>
                ))}
            </div>
          </div>
          <div className='flex flex-col justify-between p-4 shadow-md rounded-xl'>
            <div className='flex justify-between'>
              <span className='text-[#909090] text-[18px]'>Order:</span>
              <span>
                {data.orderItems &&
                  data.orderItems.reduce(
                    (acc: any, item: any) =>
                      Number(acc) + item.quantity * Number(item.price),
                    0
                  )}
                $
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-[#909090] text-[18px]'>Delivery:</span>
              <span className=''>{delivery}$</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-[#909090] text-[18px]'>Total:</span>
              <span className=''>{data?.total + delivery}$</span>
            </div>
          </div>
          {data.orderStatus === 0 && (
            <div className='text-center'>
              <LoadingButton
                variant='contained'
                loading={statusUpdate.update === 'loading'}
                onClick={() => {
                  setOpen(true);
                }}
                sx={{ width: '100%' }}
              >
                CANNEL ORDER
              </LoadingButton>
            </div>
          )}
        </div>
      )}
      <AlertDialog
        open={open}
        onClose={() => setOpen(false)}
        title='Are you sure want to cancel order?'
        content='After confirmation, the order will be canceled!'
        onConfirm={() => {
          dispatch(
            orderActions.onChangeStatusOrder({
              orderId: Number(orderId),
              status: 3,
            })
          );
        }}
      />
    </div>
  );
}

export default OrderDetail;
