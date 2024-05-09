import { Button } from '@mui/material';
import { motion, useMotionValue } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '../../common';

const OrderSuccessPage = () => {
  const progress = useMotionValue(90);
  const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-center items-center h-screen gap-2'>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: 100 }}
        style={{ x: progress }}
        transition={{ duration: 1 }}
      />
      <CircularProgress progress={progress} />
      <span className='text-[24px]'>Order Confirmed!</span>
      <span>Thank you for your purchase!</span>
      <Button
        sx={{
          textTransform: 'capitalize',
          color: 'white',
          backgroundColor: '#2baf2b',
          marginTop: '20px',
          '&:hover': {
            backgroundColor: '#2baf2b',
          },
        }}
        onClick={() => navigate('/shop', { replace: true })}
      >
        Continue Shopping
      </Button>
    </div>
  );
};

const MemoizedOrderSuccessPage = React.memo(OrderSuccessPage);
export default MemoizedOrderSuccessPage;
