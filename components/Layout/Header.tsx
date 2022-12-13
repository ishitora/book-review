import React from 'react';
import { Box, IconButton, Heading, useMediaQuery } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { pathName } from '@/constants/constant';
import SearchBar from '@/components/common/SearchBar';
import { MdNavigateBefore, MdMenu } from 'react-icons/md';

const Header = ({ toggle }: { toggle: () => void }) => {
  const router = useRouter();
  const [isMobile] = useMediaQuery('(max-width: 768px)', {
    ssr: true,
    fallback: true,
  });
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
        '@media (max-width: 600px)': {
          padding: '12px',
        },
      }}
    >
      {isMobile && (
        <IconButton
          variant="ghost"
          aria-label="toggle sidebar"
          onClick={toggle}
          icon={<MdMenu style={{ fontSize: '24px' }} />}
        />
      )}
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
