import { Button, Checkbox, Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import iconCloseCart from '../../assets/icons/close-cart.svg';
import { cartActions, selectCarts } from '../../store/cart/slice';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import { v4 as uuidv4 } from 'uuid';

const style = {
  position: 'absolute' as const,
  top: '0',
  right: '0',
  width: 450,
  height: 716,
  bgcolor: 'background.paper',
  boxShadow: 24,
};

function CartPreview({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [select, setSelect] = useState<any>([]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCarts);

  const handleCheckboxChange = (cart: any) => {
    if (select.some((item: any) => item.cartId === cart.cartId)) {
      setSelect(select.filter((item: any) => item.cartId !== cart.cartId));
    } else {
      setSelect([...select, cart]);
    }
  };

  const handleDeleteCart = (cartId: number) => {
    setSelect([]);
    dispatch(cartActions.onHandDeleteCart(cartId));
  };

  useEffect(() => {
    dispatch(cartActions.getCarts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div className='h-full flex flex-col'>
            <div className='p-[30px] flex flex-col flex-1 border-b-2'>
              <div className='flex justify-between items-center pb-[26px] border-b-2'>
                <h2 className='text-[24px] font-semibold font-[poppins]'>
                  Shopping Cart
                </h2>
                <Button onClick={onClose}>
                  <img
                    src={iconCloseCart}
                    alt='icon-cart-close'
                  />
                </Button>
              </div>
              <div className='flex flex-col gap-[20px] mt-[32px] flex-1 max-h-[438px] overflow-scroll'>
                {cart.status === 'succeeded'
                  ? cart.data.map((cart: any) => (
                      <div
                        className='flex items-center gap-4'
                        key={cart.cartId}
                      >
                        <Checkbox
                          onChange={() => handleCheckboxChange(cart)}
                          checked={select.some(
                            (item: any) => item.cartId === cart.cartId
                          )}
                        />
                        <img
                          className='h-[105px] w-[105px] rounded-sm [10px] object-cover'
                          src={cart.productImage}
                          alt='product'
                        />
                        <div className='flex-1 flex flex-col gap-2'>
                          <h3 className='mb-[8px] capitalize'>
                            {cart.productName}
                          </h3>
                          <div className='flex gap-2'>
                            <span className='text-[14px]'>
                              {cart.productColor.name}
                            </span>
                            <span className='text-[14px]'>
                              {cart.productSize.name}
                            </span>
                          </div>
                          <div className='flex items-center gap-4'>
                            <span>{cart.quantity}x</span>
                            {cart.priceDiscount && (
                              <span className='text-[12px] text-[#B88E2F]'>
                                {cart.priceDiscount}$
                              </span>
                            )}
                            <span
                              className={` ${
                                cart.priceDiscount
                                  ? 'underline text-[10px] text-gray-500'
                                  : 'text-[#B88E2F] text-[12px]'
                              } `}
                            >
                              {cart.price}$
                            </span>
                          </div>
                        </div>
                        <Button onClick={() => handleDeleteCart(cart.cartId)}>
                          <IoIosCloseCircle
                            size={24}
                            color='#9F9F9F'
                          />
                        </Button>
                      </div>
                    ))
                  : Array.from({ length: 2 }).map(() => (
                      <div
                        key={uuidv4()}
                        className='flex items-center gap-4'
                      >
                        <Checkbox />
                        <Skeleton
                          variant='rectangular'
                          width={105}
                          height={105}
                        />
                        <div className='flex-1 flex flex-col gap-2'>
                          <h3 className='mb-[8px] capitalize'>
                            <Skeleton variant='text' />
                          </h3>
                          <div className='flex gap-2'>
                            <span className='text-[14px]'>
                              <Skeleton
                                variant='text'
                                width={40}
                              />
                            </span>
                            <span className='text-[14px]'>
                              <Skeleton
                                variant='text'
                                width={40}
                              />
                            </span>
                          </div>
                          <div className='flex items-center gap-4'>
                            <Skeleton
                              variant='text'
                              width={30}
                            />
                            <span className='text-[12px] text-[#B88E2F]'>
                              <Skeleton
                                variant='text'
                                width={30}
                              />
                            </span>
                          </div>
                        </div>
                        <Button>
                          <IoIosCloseCircle
                            size={24}
                            color='#9F9F9F'
                          />
                        </Button>
                      </div>
                    ))}
              </div>
              <div className='flex justify-between pt-3'>
                <span>Subtotal</span>
                <span className='text-[#B88E2F]'>
                  {select &&
                    select.reduce(
                      (accumulator: number, currentValue: any) =>
                        Number(accumulator) +
                        Number(
                          (currentValue.priceDiscount
                            ? currentValue.priceDiscount
                            : currentValue.price) * currentValue.quantity
                        ),
                      0
                    )}
                  $
                </span>
              </div>
            </div>
            <div className='flex justify-between p-[30px]'>
              <Button
                variant='outlined'
                onClick={() => {
                  navigate('/cart');
                  onClose();
                }}
                sx={{
                  borderRadius: '20px',
                  width: '87px',
                }}
              >
                Cart
              </Button>
              <Button
                variant='outlined'
                disabled={select.length === 0}
                onClick={() => {
                  dispatch(cartActions.onHandleCheckout(select));
                  navigate('/checkout');
                  onClose();
                }}
                sx={{
                  borderRadius: '20px',
                }}
              >
                Check out
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default CartPreview;
