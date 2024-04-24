import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Checkbox, Skeleton } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Breadcrumb } from '../../common';
import Commit from '../../common/Commit/Commit';
import QuantityInput from '../../common/QuantityInput/QuantityInput';

function CartDesktop({
  cart,
  select,
  handleChangeQuantity,
  handleDeleteCart,
  handleCheckboxChange,
  handleCheckout,
}: {
  cart: any;
  select: any;
  handleChangeQuantity: any;
  handleDeleteCart: any;
  handleCheckboxChange: any;
  handleCheckout: any;
}) {
  return (
    <>
      <Breadcrumb
        title='Cart'
        part='cart'
      />
      <div className='container mx-auto flex gap-[30px] mt-[20px] sm:mt-[72px] flex-col sm:flex-row  '>
        <div className='flex-1'>
          <div className='py-[15px] pr-[64px] pl-[60px] sm:pl-[180px] bg-[#F9F1E7] grid grid-cols-4'>
            <span className='font-medium'>Product</span>
            <span className='font-medium'>Color, Size</span>
            <span className='font-medium'>Price</span>
            <span className='font-medium ml-14'>Quantity</span>
          </div>
          {cart.status === 'succeeded'
            ? cart.data.map((cart: any) => (
                <div
                  key={cart.cartId}
                  className='flex items-start mt-[55px]'
                >
                  <Checkbox
                    onChange={() => handleCheckboxChange(cart)}
                    checked={select.some(
                      (item: any) => item.cartId === cart.cartId
                    )}
                  />
                  <img
                    src={cart.productImage}
                    alt='productImage'
                    className='h-[60px] w-[60px] sm:h-[105px] sm:w-[105px] object-cover rounded mr-[34px]'
                  />
                  <div className='grid grid-cols-4 flex-1'>
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
                    <QuantityInput
                      value={cart.quantity}
                      onChange={(event: any) =>
                        handleChangeQuantity(event, cart.cartId)
                      }
                    />
                  </div>
                  <Button
                    startIcon={<DeleteIcon sx={{ color: 'red' }} />}
                    onClick={() => handleDeleteCart(cart.cartId)}
                  />
                </div>
              ))
            : Array.from({ length: 2 }).map(() => (
                <div
                  key={uuidv4()}
                  className='flex items-start gap-4 mt-[55px]'
                >
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
              {cart.status === 'succeeded' ? (
                cart.data.reduce(
                  (acc: number, cart: any) => acc + cart.price * cart.quantity,
                  0
                ) + '$'
              ) : (
                <Skeleton variant='text' />
              )}
            </span>
          </div>
          <div className='mt-[31px] grid grid-cols-3'>
            <span className='col-span-2'>Total</span>
            <span className='text-[20px] text-[#B88E2F]'>
              {cart.status === 'succeeded' ? (
                cart.data.reduce(
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
            disabled={select.length === 0}
            variant='outlined'
            size='large'
            onClick={handleCheckout}
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

export default CartDesktop;
