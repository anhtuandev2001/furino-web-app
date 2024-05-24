import { Button } from '@mui/material';
import background from '../../assets/images/backgroundShop.png';
import { IoIosArrowForward } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import AlertDialog from '../../common/AlertDialog/AlertDialog';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import { selectUser, userActions } from '../../store/user/slice';

function User() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const handleLogout = () => {
    setOpen(false);
    dispatch(userActions.logoutUser());
  };
  
  useEffect(() => {
    if (Object.keys(user.data).length === 0){
      navigate('/login');
    }
  }, [navigate, user]);
  return (
    <div className='container pt-[20px] px-4'>
      <div className='flex mt-4 gap-[20px] items-center mb-[30px]'>
        <img
          src={background}
          alt=''
          className='h-[80px] w-[80px] object-cover rounded-full'
        />
        <div className='flex flex-col gap-[5px]'>
          <span className='text-[20px]'>{user?.data?.name}</span>
          <span className='text-[14px] text-[#808080]'>{user?.data?.email}</span>
        </div>
      </div>
      <Link
        to='/order'
        className='flex justify-between items-center py-[18px] px-[20px] shadow-lg'
      >
        <div className='flex flex-col gap-[5px]'>
          <span className='text-[20px]'>My order</span>
          <span className='text-[14px] text-[#808080]'>
            Already have 10 orders
          </span>
        </div>
        <Button>
          <IoIosArrowForward size={30} />
        </Button>
      </Link>
      <Button
        variant='contained'
        sx={{ width: '100%', marginTop: '20px' }}
        onClick={() => setOpen(true)}
      >
        Logout
      </Button>
      <AlertDialog
        open={open}
        title='Are you sure want to Logout?'
        content='After confirm you must login agin to buy product. Are you sure?'
        onClose={() => setOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}

export default User;
