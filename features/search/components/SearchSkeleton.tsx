import React from 'react';
import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';

const arr = new Array(10).fill(0);

const SearchSkeleton = () => {
  return (
    <>
      {arr.map((_, index) => (
        <Box sx={{ display: 'flex', padding: '12px' }} key={index}>
          <Box sx={{ flex: '0 0 100px', marginRight: '12px' }}>
            <Skeleton height="120px" />
          </Box>
          <Box
            sx={{
              flex: 1,
              '&> * + *': {
                marginTop: '12px',
              },
            }}
          >
            <Skeleton height="30px" />
            <Skeleton height="20px" width="200px" />
            <SkeletonText mt="2" noOfLines={2} spacing="4" skeletonHeight="2" />
            <Skeleton height="20px" width="100px" />
          </Box>
        </Box>
      ))}
    </>
  );
};

export default SearchSkeleton;
