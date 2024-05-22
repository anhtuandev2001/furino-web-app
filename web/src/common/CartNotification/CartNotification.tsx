import { Button } from '@mui/material';
import './style.scss';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function CartNotification({
  cartNotification,
  onClose,
  onCheckout,
}: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className='p-8 flex flex-col cart-notification gap-6 shadow-sm absolute z-10 bg-white top-[61px] w-[395px] border right-4'
    >
      <div className='flex justify-between items-center'>
        <div className='flex gap-3'>
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
              d='M16.0736 6.14639C16.1674 6.24016 16.22 6.36731 16.22 6.49989C16.22 6.63248 16.1674 6.75963 16.0736 6.85339L8.13364 14.7934C8.03988 14.8871 7.91273 14.9398 7.78014 14.9398C7.64756 14.9398 7.52041 14.8871 7.42664 14.7934L4.15264 11.5184C4.10489 11.4723 4.0668 11.4171 4.04059 11.3561C4.01439 11.2951 4.0006 11.2295 4.00002 11.1631C3.99944 11.0967 4.01209 11.0309 4.03723 10.9694C4.06237 10.908 4.0995 10.8521 4.14645 10.8052C4.19339 10.7582 4.24922 10.7211 4.31067 10.696C4.37212 10.6708 4.43796 10.6582 4.50434 10.6588C4.57073 10.6593 4.63634 10.6731 4.69735 10.6993C4.75835 10.7255 4.81352 10.7636 4.85964 10.8114L7.78164 13.7334L15.3676 6.14639C15.4614 6.05266 15.5886 6 15.7211 6C15.8537 6 15.9809 6.05266 16.0746 6.14639H16.0736Z'
              fill='black'
            />
          </svg>
          <h3 className='text-[13px]'>Item added to your cart</h3>
        </div>
        <Button onClick={onClose}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
          >
            <path
              d='M11.0607 10.3536L18.7071 2.70711L18 2L10.3536 9.64645L2.70711 2L2 2.70711L9.64645 10.3536L2 18L2.70711 18.7071L10.3536 11.0607L18 18.7071L18.7071 18L11.0607 10.3536Z'
              fill='black'
            />
          </svg>
        </Button>
      </div>
      <div className='flex gap-3 text-[13px]'>
        <img
          src={cartNotification.cart.productImage}
          alt='product'
          className='w-[70px] h-[70px] object-cover'
        />
        <div className='flex flex-col gap-2 justify-center'>
          <span>{cartNotification.cart.productName}</span>
          <span>
            Color:{' '}
            {`${cartNotification.cart.productColor.name}, ${cartNotification.cart.productSize.name}`}
          </span>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <Link
          to='/cart'
          onClick={onClose}
          className='py-4 text-center border border-black'
        >
          View my cart ({cartNotification.cart.quantity})
        </Link>
        <Link
          to='/checkout'
          className='py-4 text-center border border-black bg-black text-white'
          onClick={() => {
            onClose();
            onCheckout(cartNotification.cart);
          }}
        >
          Check out
        </Link>
      </div>
    </div>
  );
}

export default CartNotification;
