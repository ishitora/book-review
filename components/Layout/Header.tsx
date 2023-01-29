import React, { useEffect, useRef } from 'react';
import {
  Box,
  Button,
  IconButton,
  Heading,
  useMediaQuery,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { pathName } from '@/constants/constant';
import SearchBar from '@/components/common/SearchBar';
import { getAccount } from '@/slices/accountSlice';
import { MdNavigateBefore, MdMenu } from 'react-icons/md';
import { useSession, signOut } from 'next-auth/react';
import { useAppDispatch } from '@/hooks/redux';
import { logout } from '@/slices/accountSlice';
const Header = ({ toggle }: { toggle: () => void }) => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const [isMobile] = useMediaQuery('(max-width: 768px)', {
    ssr: true,
    fallback: true,
  });

  const { data: session, status } = useSession();
  const isLogining = useRef(true);

  useEffect(() => {
    if (isLogining.current) {
      if (status === 'authenticated') {
        dispatch(getAccount({ email: session?.user?.email || null }));
        isLogining.current = false;
      } else if (status === 'unauthenticated') {
        dispatch(getAccount({ email: null }));
        isLogining.current = false;
      }
    }
  }, [status]);

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
      <SearchBar />

      <Button
        size="lg"
        variant="ghost"
        onClick={() => {
          dispatch(logout());
          signOut();
          router.push('/');
        }}
      >
        登出
      </Button>
    </Box>
  );
};

export default Header;
