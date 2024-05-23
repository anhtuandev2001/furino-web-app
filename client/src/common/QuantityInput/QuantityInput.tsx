import { IconButton } from '@mui/material';

export default function QuantityInput({
  value,
  onChange,
  update,
}: {
  value: number;
  onChange?: any;
  update?: any;
}) {
  return (
    <div className='flex border border-[#D0D0D0] items-center justify-between gap-2 p-3 w-[138px]'>
      <IconButton
        disabled={value === 1 || update?.status === 'loading' || !onChange}
        onClick={() => {
          onChange(value - 1);
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
        >
          <path
            d='M5.5 10H14.5'
            stroke='black'
          />
        </svg>
      </IconButton>
      <span className='text-subText'>{value}</span>
      <IconButton
        disabled={update?.status === 'loading' || value === 100 || !onChange}
        onClick={() => {
          onChange(value + 1);
        }}
      >
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
            d='M10.5 9.5V5.5H9.5L9.5 9.5H5.5V10.5H9.5L9.5 14.5H10.5V10.5H14.5V9.5H10.5Z'
            fill='black'
          />
        </svg>
      </IconButton>
    </div>
  );
}
