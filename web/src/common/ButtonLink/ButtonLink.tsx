import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface ButtonLinkProps {
  children: React.ReactNode;
  link: string;
  sx?: any;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ children, link, sx }) => {
  return (
    <Button
      component={Link}
      to={link}
      sx={{
        width: 'fit-content',
        color: 'white',
        borderRadius: '0',
        ':hover': {
          background: '#ddaf48',
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonLink;
