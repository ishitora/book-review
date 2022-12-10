import React from 'react';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import SearchBar from '@/components/common/SearchBar';

const Header = () => {
  const router = useRouter();

  return (
    <Box
      as="header"
      sx={{
        padding: '16px',
        height: '80px',
        display: 'flex',
      }}
    >
      {router.asPath.startsWith('/search') && <SearchBar />}
    </Box>
  );
};

export default Header;
