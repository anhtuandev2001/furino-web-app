import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../store/root/hooks';
import { selectLoadingPage } from '../../store/page/slice';

function LoadingPage() {
  const loadingPage = useAppSelector(selectLoadingPage);
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);

  useEffect(() => {
    if (!loadingPage) {
      setIsBackdropOpen(true);
      const timeoutId = setTimeout(() => {
        setIsBackdropOpen(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [loadingPage]);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isBackdropOpen}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  );
}

export default LoadingPage;
