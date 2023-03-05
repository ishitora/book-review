import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
type Props = { children: React.ReactNode };

const ErrorMessage = ({ children }: Props) => {
  return (
    <Box sx={{ height: '18px' }}>
      <Typography
        variant="caption"
        sx={{
          color: 'error.main',
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
