import React from 'react';
import Image from 'next/image';
import { Box, Button, Center, Avatar, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { logout } from '@/slices/accountSlice';

import { FaBook, FaSearch } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';

const Header = () => {
  const router = useRouter();
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        padding: '16px',
        paddingTop: 0,
        width: '240px',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderRight: '1px solid #eee',
        minHeight: '550px',
        '@media screen and (max-width: 600px)': {},
        borderColor(theme) {
          return theme.colors.primary.dark;
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '80px',
          position: 'relative',
          //   '@media screen and (max-width: 600px)': {
          //     height: '60px',
          //     flex: '0 0 100%',
          //   },
        }}
      >
        <Image
          src="/image/logo.png"
          fill
          alt="logo"
          style={{ objectFit: 'contain' }}
          onClick={() => {
            router.push('/bookshelf');
          }}
        />
      </Box>
      <Center
        sx={{
          alignSelf: 'center',
          marginBottom: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar size="lg" name={account.info ? account.info.name : ''} />
        {account.info && <Text textAlign="center">{account.info.name}</Text>}
      </Center>
      <Button
        size="lg"
        variant="ghost"
        leftIcon={<FaBook />}
        onClick={() => {
          router.push('/bookshelf');
        }}
      >
        ????????????
      </Button>
      <Button
        size="lg"
        variant="ghost"
        leftIcon={<FaSearch />}
        onClick={() => {
          router.push('/search');
        }}
      >
        ??????
      </Button>

      <Button
        size="lg"
        variant="ghost"
        leftIcon={<MdLogout />}
        onClick={() => {
          dispatch(logout());
          router.push('/login');
        }}
      >
        ??????
      </Button>

      {/* {account.isLogin && account.info ? (
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<Avatar size="lg" />}
              sx={{
                backgroundColor: 'rgba(0,0,0,0)',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.2)',
                },
              }}
            >
              <Text>{account.info.name}</Text>
            </MenuButton>
            <MenuList>
              <MenuItem></MenuItem>
              <MenuItem>????????????</MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(logout());
                  router.push(`/`);
                }}
              >
                ??????
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button
            onClick={() => {
              router.push('/login');
            }}
          >
            ??????
          </Button>
        )} */}
    </Box>
  );
};

export default Header;
