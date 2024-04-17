import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Skeleton } from '@mui/material';
import Breadcrumb from '../../common/Breadcrumb/Breadcrumb';
import Commit from '../../common/Commit/Commit';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import {
  cartActions,
  selectCarts,
  selectLoading,
} from '../../store/cart/slice';

function Cart() {
  const dispatch = useAppDispatch();

  const carts = useAppSelector(selectCarts);
  const loading = useAppSelector(selectLoading);
  useEffect(() => {
    if (carts.length === 0) {
      dispatch(cartActions.getCarts());
    }
  }, [dispatch, carts]);
  console.log(carts);

  return (
    <>
      <Breadcrumb
        title='Cart'
        part='cart'
      />
      <div className='container mx-auto flex gap-[30px] mt-[72px]'>
        <div className='flex-1'>
          <div className='py-[15px] pr-[64px] pl-[142px] bg-[#F9F1E7] grid grid-cols-5'>
            <span className='font-medium'>Product</span>
            <span className='font-medium'>Color, Size</span>
            <span className='font-medium'>Price</span>
            <span className='font-medium '> Price Discount</span>
            <span className='font-medium'>Quantity</span>
          </div>
          {!loading
            ? carts.map((cart: any) => (
                <div
                  key={cart.cartId}
                  className='flex items-start mt-[55px]'
                >
                  <img
                    src={cart.productImage}
                    alt='productImage'
                    className='h-[105px] w-[105px] object-cover rounded mr-[34px]'
                  />
                  <div className='grid grid-cols-5 flex-1'>
                    <span className='text-[#9F9F9F]'>{cart.productName}</span>
                    <span className='text-[#9F9F9F]'>
                      {`${cart.productColor.name}, ${cart.productSize.name}`}
                    </span>

                    <span
                      className={`text-[#9F9F9F] ${
                        cart.priceDiscount ? 'line-through' : ''
                      }`}
                    >
                      {cart.price}$
                    </span>
                    {cart.priceDiscount ? (
                      <span className='text-[#9F9F9F]'>
                        {cart.priceDiscount}$
                      </span>
                    ) : (
                      '0'
                    )}
                    <input
                      type='text'
                      value={cart.quantity}
                      className='outline-none w-[50px] '
                      max={10}
                    />
                  </div>
                  <Button startIcon={<DeleteIcon sx={{ color: 'red' }} />} />
                </div>
              ))
            : Array.from({ length: 2 }).map(() => (
                <div className='flex items-start gap-4 mt-[55px]'>
                  <Skeleton
                    variant='rounded'
                    width={105}
                    height={105}
                  />
                  <div className='grid grid-cols-5 gap-4 flex-1'>
                    <Skeleton variant='text' />
                    <Skeleton variant='text' />

                    <Skeleton variant='text' />
                    <Skeleton variant='text' />
                    <Skeleton variant='text' />
                  </div>
                  <Button startIcon={<DeleteIcon sx={{ color: 'red' }} />} />
                </div>
              ))}
        </div>
        <div className='w-[392px] px-[75px] flex flex-col pt-[15px] pb-[80px] bg-[#F9F1E7] h-fit'>
          <h2 className='text-[32px] font-semibold text-center'>Cart Totals</h2>
          <div className='mt-[61px] grid grid-cols-3'>
            <span className='text-[16px] font-medium col-span-2'>Subtotal</span>
            <span className='text-[16px] font-medium text-[#9F9F9F]'>
              {!loading ? (
                (carts &&
                  carts.reduce(
                    (acc: number, cart: any) =>
                      acc + cart.price * cart.quantity,
                    0
                  )) + '$'
              ) : (
                <Skeleton variant='text' />
              )}
            </span>
          </div>
          <div className='mt-[31px] grid grid-cols-3'>
            <span className='col-span-2'>Total</span>
            <span className='text-[20px] text-[#B88E2F]'>
              {!loading ? (
                carts &&
                carts.reduce(
                  (acc: number, cart: any) =>
                    acc +
                    (cart.priceDiscount ? cart.priceDiscount : cart.price) *
                      cart.quantity,
                  0
                ) + '$'
              ) : (
                <Skeleton variant='text' />
              )}
            </span>
          </div>
          <Button
            variant='outlined'
            size='large'
            sx={{ marginTop: '42px', color: ' black', outline: 'black' }}
          >
            Check Out
          </Button>
        </div>
      </div>
      <Commit />
    </>
  );
}

export default Cart;
