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
  const { onClick, children, variant, ...rest } = props;

  return (
    <Button
      disableElevation
      sx={[
        {
          border: '1px solid',
          textTransform: 'none',
        },
        variants[variant] || variants.contained,
      ]}
      {...rest}
      onClick={onClick}
      variant="contained"
    >
      {children}
    </Button>
  );
};

export default CustomButton;
