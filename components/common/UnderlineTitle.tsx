import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

const UnderlineTitle = (props: TypographyProps) => {
  const { sx, children, ...rest } = props;
  return (
    <Typography
      sx={[
        {
          width: 'max-content',
          color: 'primary.main',
          borderBottom: '3px solid',
          borderColor: 'primary.main',
          marginBottom: '20px',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default UnderlineTitle;
