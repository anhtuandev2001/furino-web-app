import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function HeaderMobile({ title }: { title: string }) {
  return (
    <div className='text-center py-4 sm:hidden sticky top-0 z-10 bg-white'>
      <Button
        startIcon={<ArrowBackIcon sx={{ color: 'black' }} />}
        onClick={() => window.history.back()}
        sx={{ width: 'fit-content', position: 'absolute', left: 0 }}
        className='col-span-1'
      />
      <span className='text-[24px] font-semibold'>{title}</span>
    </div>
  );
}

export default HeaderMobile;
