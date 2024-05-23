import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { v4 as uuidv4 } from 'uuid';
import './style.scss';

interface FormRadiusProps {
  alignment: string;
  onChange: (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => void;
  list?: any[];
  sx?: any;
  title: string;
}

function FormRadius({
  alignment,
  onChange,
  list,
  sx,
  title,
}: FormRadiusProps) {

  return (
    <div className=''>
      <span className='text-[13px] block'>{title}</span>
      {list && list.length > 0 && (
        <ToggleButtonGroup
          color='primary'
          value={alignment}
          exclusive
          onChange={onChange}
          aria-label='Platform'
          sx={{ gap: '16px', marginTop: '12px', flexWrap: 'wrap'}}
        >
          {list.map((item) => (
            <ToggleButton
              style={{ borderRadius: '50px', border: '1px solid #000000' }}
              key={uuidv4()}
              value={item.productColorId || item.productSizeId}
              sx={{
                padding: '8px 12px',
                minWidth: '100px',
                textTransform: 'capitalize',
                border: '1px solid black',
                ...(item.disable && { pointerEvents: 'none', opacity: 0.5 }),
                ...sx,
              }}
            >
              {item?.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    </div>
  );
}

export default FormRadius;
