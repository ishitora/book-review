import React from 'react';
import { Box, IconButton, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { pathName } from '@/constants/constant';
import SearchBar from '@/components/common/SearchBar';
import { MdNavigateBefore } from 'react-icons/md';

const Header = () => {
  const router = useRouter();
  console.log(router);
  return (
    <Box
      as="header"
      sx={{
        padding: '12px 40px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '2px solid #eee',
        '&>* + *': {
          marginLeft: '12px',
        },
      }}
    >
      {(router.asPath.startsWith('/book/') ||
        router.asPath.startsWith('/myBooks/')) && (
        <IconButton
          variant="ghost"
          aria-label="previous page"
          onClick={() => {
            router.back();
          }}
          icon={<MdNavigateBefore style={{ fontSize: '24px' }} />}
        />
      )}
      {pathName[router.pathname] && (
        <Heading as="h3" size="md">
          {pathName[router.pathname]}
        </Heading>
      )}
      {router.asPath.startsWith('/search') && <SearchBar />}
    </Box>
  );
};

export default Header;
