import { Skeleton } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { v4 as uuidv4 } from 'uuid';

interface FormRadiusProps {
  alignment: string;
  onChange: (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => void;
  list?: any[];
  sx?: any;
  style?: any;
  title: string;
}

function FormRadius({
  alignment,
  onChange,
  list,
  sx,
  style,
  title,
}: FormRadiusProps) {

  return (
    <div className='h-[70px]'>
      <span className='text-[14px] text-[#9F9F9F] block'>{title}</span>
      {list && list.length > 0 ? (
        <ToggleButtonGroup
          color='primary'
          value={alignment}
          exclusive
          onChange={onChange}
          aria-label='Platform'
          sx={{ gap: '16px', marginTop: '12px' }}
        >
          {list.map((item) => (
            <ToggleButton
              key={uuidv4()}
              value={item.productColorId || item.productSizeId}
              sx={{
                border: 'none',
                height: '30px',
                width: '30px',
                padding: 0,
                ...(item.disable
                  ? { pointerEvents: 'none', opacity: 0.5 }
                  : {}),
                ...(item.hex
                  ? {
                      backgroundColor: item.hex,
                      '&.Mui-selected': {
                        backgroundColor: item.hex,
                        '&::before': {
                          content: '"✔"',
                          color: 'black',
                        },
                      },
                      '&.Mui-selected:hover': {
                        backgroundColor: item.hex,
                      },
                      '&:hover': {
                        backgroundColor: item.hex,
                      },
                    }
                  : {}),
                ...sx,
              }}
              style={style}
            >
              {item?.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      ) : (
        <Skeleton
          variant='rectangular'
          width={150}
          height={30}
        />
      )}
    </div>
  );
}

export default FormRadius;
