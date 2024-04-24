import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Checkbox, Skeleton } from '@mui/material';
import QuantityInput from '../../common/QuantityInput/QuantityInput';
import { ButtonCustom } from '../../common';

function CartMobile({
  carts,
  select,
  handleChangeQuantity,
  handleDeleteCart,
  handleCheckboxChange,
  handleCheckout,
}: {
  carts: any;
  select: any;
  handleChangeQuantity: any;
  handleDeleteCart: any;
  handleCheckboxChange: any;
  handleCheckout: any;
}) {
  return (
    <div className='h-full flex flex-col'>
      <div className='text-center py-4 relative '>
        <Button
          startIcon={<ArrowBackIcon sx={{ color: 'black' }} />}
          onClick={() => window.history.back()}
          sx={{ width: 'fit-content', position: 'absolute', left: 0 }}
          className='col-span-1'
        />
        <span className='text-[24px] font-semibold'>CART</span>
      </div>
      <div className='mt-[20px] flex flex-col gap-4 px-4 justify-between flex-1 overflow-scroll'>
        <div className='flex flex-col gap-4 overflow-scroll'>
          {carts.status === 'succeeded'
            ? carts.data.map((cart: any) => (
                <div
                  key={cart.cartId}
                  className='flex justify-between'
                >
                  <div>
                    <Checkbox
                      onChange={() => handleCheckboxChange(cart)}
                      checked={select.some(
                        (item: any) => item.cartId === cart.cartId
                      )}
                    />
                  </div>
                  <img
                    src={cart.productImage}
                    alt={cart.productName}
                    className='h-[105px] w-[105px] rounded-[10px] object-cover'
                  />
                  <div className='flex flex-col justify-between'>
                    <h3>{cart.productName}</h3>
                    <span>
                      {cart.productColor.name + ', ' + cart.productSize.name}
                    </span>
                    <span className='text-[14px]'>{cart.price}$</span>
                    <QuantityInput
                      value={cart.quantity}
                      onChange={(event: any) =>
                        handleChangeQuantity(event, cart.cartId)
                      }
                    />
                  </div>
                  <div>
                    <Button
                      endIcon={<DeleteIcon sx={{ color: 'black' }} />}
                      onClick={() => handleDeleteCart(cart.cartId)}
                    />
                  </div>
                </div>
              ))
            : Array.from({ length: 8 }).map(() => (
                <div className='flex justify-between'>
                  <div>
                    <Checkbox />
                  </div>
                  <Skeleton
                    variant='rectangular'
                    height={105}
                    width={105}
                  />
                  <div className='flex flex-col justify-between'>
                    <Skeleton
                      variant='text'
                      width={135}
                    />
                    <Skeleton variant='text' />
                    <Skeleton variant='text' />
                  </div>
                  <div>
                    <Button endIcon={<DeleteIcon sx={{ color: 'black' }} />} />
                  </div>
                </div>
              ))}
        </div>
        <ButtonCustom
          sx={{ width: '100%', marginBottom: '20px' }}
          onClick={handleCheckout}
          variant='contained'
          disabled={select.length === 0}
        >
          Checkout
        </ButtonCustom>
      </div>
    </div>
  );
}

export default CartMobile;
