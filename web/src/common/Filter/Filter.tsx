import { Button } from '@mui/material';
import { MdKeyboardArrowDown } from 'react-icons/md';
import iconSort from '../../assets/icons/sort.png';

function Filter({count}: {count: number}) {
  return (
    <div className='flex justify-between text-sm'>
      <div className='gap-6 items-center hidden md:flex'>
        <span>Filter:</span>
        <Button className='flex gap-2 items-center'>
          <span className='text-[14px] font-normal'>Avalability</span>
          <MdKeyboardArrowDown size={20} />
        </Button>
        <Button className='flex gap-2 items-center'>
          <span className='text-[14px] font-normal'>Avalability</span>
          <MdKeyboardArrowDown size={20} />
        </Button>
        <Button className='flex gap-2 items-center'>
          <span className='text-[14px] font-normal'>Avalability</span>
          <MdKeyboardArrowDown size={20} />
        </Button>
      </div>
      <div className='md:hidden gap-2 flex items-center'>
        <img
          src={iconSort}
          alt='icon sort'
          className='w-[20px] h-[20px]'
        />
        <span>Filter and sort</span>
      </div>
      <div>
        <div className='flex gap-6 items-center'>
          <div className='hidden md:flex  gap-6 items-center'>
            <span className=''>Sort by:</span>
            <Button className='gap-2 items-center'>
              <span className='text-[14px] font-normal'>Avalability</span>
              <MdKeyboardArrowDown size={20} />
            </Button>
          </div>
          <span>{count} products</span>
        </div>
      </div>
    </div>
  );
}

export default Filter;
