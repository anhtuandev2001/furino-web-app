import { Button } from '@mui/material';

function ButtonCustom({ children, sx, ...props }: any) {
  return (
    <Button
      {...props}
      sx={{
        background: 'black',
        color: 'white',
        '&:hover': {
          background: 'black',
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
}

export default ButtonCustom;
