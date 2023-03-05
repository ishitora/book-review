import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

const styles = {
  primary: {
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
  },
  error: {
    contained: {
      color: '#fff',
      backgroundColor: 'error.main',
      borderColor: 'error.main',
      '&:hover': {
        backgroundColor: 'error.dark',
      },
    },
    outlined: {
      color: 'error.main',
      backgroundColor: '#fff',
      borderColor: 'error.main',
      '&:hover': {
        backgroundColor: 'error.light',
        color: '#fff',
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
      color: 'error.dark',
      backgroundColor: '#fff',
      borderColor: 'transparent',
      '&:hover': {
        backgroundColor: 'error.light',
      },
    },
  },
};

type CustomButtonProps = Omit<ButtonProps, 'variant'> & {
  error?: boolean;
  variant?: 'contained' | 'common' | 'outlined' | 'text';
};

const getStyle = (variant, error = false) => {
  const type = error ? 'error' : 'primary';

  return styles[type][variant || 'contained'] || styles[type].contained;
};

const CustomButton = (props: CustomButtonProps) => {
  const { onClick, children, variant, sx = {}, error, ...rest } = props;

  return (
    <Button
      disableElevation
      sx={[
        {
          border: '1px solid',
          textTransform: 'none',
          padding: '8px 12px',
        },
        getStyle(variant, error),

        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
