import React from 'react';
import Button from '@mui/material/Button';

const variants = {
  contained: {
    color: '#fff',
    backgroundColor: 'primary.main',
    borderColor: 'primary.main',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  },
  outlined: {
    color: 'primary.main',
    backgroundColor: '#fff',
    borderColor: 'primary.main',
    '&:hover': {
      backgroundColor: 'primary.light',
    },
  },
  common: {
    color: '#888',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    '&:hover': {
      backgroundColor: '#eee',
    },
  },
  text: {
    color: 'primary.dark',
    backgroundColor: '#fff',
    borderColor: 'transparent',
    '&:hover': {
      backgroundColor: 'primary.light',
    },
  },
};

const CustomButton = (props) => {
  const { onClick, children, variant, sx = {}, ...rest } = props;

  return (
    <Button
      disableElevation
      sx={[
        {
          border: '1px solid',
          textTransform: 'none',
          padding: '8px 12px',
        },
        variants[variant] || variants.contained,
        sx,
      ]}
      {...rest}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
