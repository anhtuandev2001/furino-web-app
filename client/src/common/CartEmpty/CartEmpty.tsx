import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function CartEmpty() {
  return (
    <div className='flex flex-col items-center py-[50px]'>
      <h2 className='text-[32px] mt-[45] mb-5'>Your cart is empty</h2>
      <Button
        variant='contained'
        to='/shop'
        component={Link}
      >
        Continue Shopping
      </Button>
    </div>
  );
}

export default CartEmpty;
