import React from 'react';
import { SkeletonText } from '@chakra-ui/react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const arr = new Array(10).fill(0);

const SearchSkeleton = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        gap: '20px',
        padding: '40px',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr',
        },
      }}
    >
      <Skeleton
        sx={{
          height: '500px',
          width: '200px',
          '@media (max-width: 768px)': {
            height: '60px',
            width: '100%',
          },
        }}
        variant="rectangular"
      />
      <Box>
        {arr.map((_, index) => (
          <Box
            sx={{
              display: 'flex',
              marginTop: '20px',
              '@media (min-width: 768px)': {
                padding: '12px',
              },
            }}
            key={index}
          >
            <Box sx={{ flex: '0 0 100px', marginRight: '12px' }}>
              <Skeleton variant="rectangular" height={150} />
            </Box>
            <Box
              sx={{
                flex: 1,
                '&> * + *': {
                  marginTop: '12px',
                },
              }}
            >
              <Skeleton height="30px" width="180px" />
              <Skeleton height="20px" width="180px" />

              <Skeleton height="20px" width="100px" />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SearchSkeleton;
