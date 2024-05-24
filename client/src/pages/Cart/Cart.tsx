import {
  Button,
  Checkbox,
  CircularProgress,
  IconButton,
  Skeleton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { CartEmpty, HeadingPage } from '../../common';
import QuantityInput from '../../common/QuantityInput/QuantityInput';
import {
  cartActions,
  selectActions,
  selectCarts,
} from '../../store/cart/slice';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';

function Cart() {
  const dispatch = useAppDispatch();
  const [select, setSelect] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  const carts = useAppSelector(selectCarts);
  const actions = useAppSelector(selectActions);

  const handleChangeQuantity = (event: any, cartId: number) => {
    dispatch(cartActions.onHandleUpdateCart({ cartId, quantity: event }));
  };
  const handleDeleteCart = (cartId: number) => {
    dispatch(cartActions.onHandDeleteCart(cartId));
  };
  const handleCheckboxChange = (cart: any) => {
    if (select.some((item: any) => item.cartId === cart.cartId)) {
      const newSelect = select.filter(
        (item: any) => item.cartId !== cart.cartId
      );
      setSelect(newSelect);
    } else {
      const newSelect = [...select, cart];
      setSelect(newSelect);
      if (newSelect.length === carts.data.length) {
        setSelectAll(true);
        return;
      }
    }
    setSelectAll(false);
  };

  const handleCheckout = () => {
    dispatch(cartActions.onHandleCheckout(select));
    navigate('/checkout');
  };

  // useEffect(() => {
  //   if (carts.status === 'idle') {
  //     dispatch(cartActions.getCarts());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (selectAll) {
      setSelect(carts.data);
    } else if (!selectAll && select.length === carts.data.length) {
      setSelect([]);
    }
  }, [selectAll, carts.data, select.length]);

  if (carts.status === 'succeeded' && carts.data.length === 0 || carts.status === 'failed') {
    return <CartEmpty />;
  }

  return (
    <div className='h-full flex flex-col container px-4'>
      <HeadingPage
        title='Your cart'
        continueShopping
      />
      <div>
        <div className='text-sm flex text-subText pb-5 border-b-2 md:border-b md:grid md:grid-cols-12 gap-4'>
          <div className='md:col-span-1'>
            <Checkbox
              checked={selectAll}
              onChange={() => setSelectAll(!selectAll)}
              disabled={carts.status === 'loading'}
            />
          </div>
          <span className='col-span-8'>PRODUCT</span>
          <span className='hidden md:block md:col-span-1'>QUANTITY</span>
          <span className='md:col-span-2 text-right flex-1'>TOTAL</span>
        </div>
        <div className='flex flex-col gap-10 my-10 border-b pb-10'>
          {carts.status === 'loading'
            ? Array.from({ length: 4 }).map(() => (
                <div
                  className='flex justify-between md:grid md:grid-cols-12 items-start'
                  key={uuidv4()}
                >
                  <div className='md:col-span-1'>
                    <Checkbox disabled />
                  </div>
                  <Skeleton
                    variant='rectangular'
                    height={74}
                    className='h-[74px] w-[74px] object-cover md:w-[100px] md:h-[100px] md:col-span-1'
                  />
                  <div className='flex md:ml-6 flex-col gap-2 md:col-span-9 md:grid md:grid-cols-9 md:gap-0'>
                    <div className='md:col-span-7'>
                      <Skeleton
                        variant='text'
                        width={100}
                      />
                      <Skeleton
                        variant='text'
                        width={100}
                      />
                    </div>
                    <div className='flex gap-2 md:col-span-2'>
                      <Skeleton
                        variant='text'
                        width={100}
                      />
                    </div>
                  </div>
                  <span className='col-span-1 text-right'>
                    <Skeleton
                      variant='text'
                      width={100}
                    />
                  </span>
                </div>
              ))
            : carts.data.map((cart: any) => (
                <div
                  className='flex gap-4 md:grid md:grid-cols-12'
                  key={uuidv4()}
                >
                  <div className='col-span-1'>
                    <Checkbox
                      onChange={() => handleCheckboxChange(cart)}
                      checked={select.some(
                        (item: any) => item.cartId === cart.cartId
                      )}
                    />
                  </div>
                  <img
                    src={cart.productImage}
                    alt='product'
                    className='h-[74px] w-[74px] object-cover md:w-[100px] md:h-[100px] md:col-span-1'
                  />
                  <div className='flex md:ml-6 flex-col gap-2 md:col-span-9 md:grid md:grid-cols-9 md:gap-0 flex-1'>
                    <div className='md:col-span-7'>
                      <h3>{cart.productName}</h3>
                      <span className='text-sm text-subText'>
                        {`Color: ${cart.productColor.name}, Size: ${cart.productSize.name}`}
                      </span>
                    </div>
                    <div className='flex gap-2 md:col-span-2'>
                      <div>
                        <div className='flex items-center gap-2'>
                          <QuantityInput
                            value={cart.quantity}
                            update={actions.update}
                            onChange={(value: any) => {
                              handleChangeQuantity(value, cart.cartId);
                            }}
                          />
                          <IconButton
                            onClick={() => handleDeleteCart(cart.cartId)}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='20'
                              height='20'
                              viewBox='0 0 20 20'
                              fill='none'
                            >
                              <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M12.97 5.5H16.5C16.6326 5.5 16.7598 5.55268 16.8536 5.64645C16.9473 5.74021 17 5.86739 17 6C17 6.13261 16.9473 6.25979 16.8536 6.35355C16.7598 6.44732 16.6326 6.5 16.5 6.5H15.25V16.5C15.25 16.6326 15.1973 16.7598 15.1036 16.8536C15.0098 16.9473 14.8826 17 14.75 17H6.25C5.97 17 5.75 16.78 5.75 16.5V6.5H4.5C4.36739 6.5 4.24021 6.44732 4.14645 6.35355C4.05268 6.25979 4 6.13261 4 6C4 5.86739 4.05268 5.74021 4.14645 5.64645C4.24021 5.55268 4.36739 5.5 4.5 5.5H8.03C8.06454 4.9032 8.27312 4.32958 8.63 3.85C9.06 3.32 9.7 3 10.5 3C11.3 3 11.94 3.32 12.37 3.85C12.7264 4.32986 12.9349 4.90332 12.97 5.5ZM10.5 4C9.99 4 9.64 4.19 9.41 4.48C9.22 4.72 9.1 5.08 9.05 5.5H11.95C11.89 5.08 11.79 4.72 11.59 4.48C11.35 4.19 11.01 4 10.5 4ZM6.75 6.5V16H14.25V6.5H6.75ZM8.69643 7.89645C8.7902 7.80268 8.91738 7.75 9.04999 7.75C9.1826 7.75 9.30977 7.80268 9.40354 7.89645C9.49731 7.99021 9.54999 8.11739 9.54999 8.25V14.25C9.54999 14.3826 9.49731 14.5098 9.40354 14.6036C9.30977 14.6973 9.1826 14.75 9.04999 14.75C8.91738 14.75 8.7902 14.6973 8.69643 14.6036C8.60267 14.5098 8.54999 14.3826 8.54999 14.25V8.25C8.54999 8.11739 8.60267 7.99021 8.69643 7.89645ZM11.5964 7.89645C11.6902 7.80268 11.8174 7.75 11.95 7.75C12.0826 7.75 12.2098 7.80268 12.3035 7.89645C12.3973 7.99021 12.45 8.11739 12.45 8.25V14.25C12.45 14.3826 12.3973 14.5098 12.3035 14.6036C12.2098 14.6973 12.0826 14.75 11.95 14.75C11.8174 14.75 11.6902 14.6973 11.5964 14.6036C11.5027 14.5098 11.45 14.3826 11.45 14.25V8.25C11.45 8.11739 11.5027 7.99021 11.5964 7.89645Z'
                                fill='black'
                              />
                            </svg>
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  </div>

                  <span className='col-span-1 text-right'>
                    {(actions.update.status === 'loading' &&
                      actions.update.cartId === cart.cartId) ||
                    (actions.delete.status === 'loading' &&
                      actions.delete.cartId === cart.cartId) ? (
                      <CircularProgress />
                    ) : (
                      `$${cart.price * cart.quantity}`
                    )}
                  </span>
                </div>
              ))}
        </div>
        <div className='my-8 flex gap-4 flex-col justify-center md:items-end text-center md:text-right'>
          <h3>
            Subtotal: $
            {carts.data.reduce(
              (acc: number, item: { price: number; quantity: number }) =>
                acc + item.price * item.quantity,
              0
            )}
          </h3>
          <h4 className='text-sm'>Taxes and shipping calculated at checkout</h4>
          <Button
            variant='contained'
            disabled={select.length === 0}
            className='md:w-[360px]'
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
