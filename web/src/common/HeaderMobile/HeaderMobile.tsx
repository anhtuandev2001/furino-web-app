import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';

function HeaderMobile({ title }: { title: string }) {
  return (
    <div className='text-center py-4 md:hidden sticky top-0 z-10 bg-white'>
      <IconButton
        onClick={() => window.history.back()}
        sx={{
          width: 'fit-content',
          position: 'absolute',
          left: '10px',
        }}
        className='col-span-1'
      >
        <ArrowBackIcon sx={{ color: 'black' }} />
      </IconButton>
      <span className='text-[24px] font-semibold'>{title}</span>
    </div>
  );
}

export default HeaderMobile;
