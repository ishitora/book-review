import React, { useState, KeyboardEvent } from 'react';
import Image from 'next/image';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Avatar,
  Text,
} from '@chakra-ui/react';
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
            router.push('/');
          }}
        />
      </Box>
      <Box sx={{ alignSelf: 'center', marginBottom: '40px' }}>
        <Avatar size="lg" />
        {account.info && <Text textAlign="center">{account.info.name}</Text>}
      </Box>
      <Button
        size="lg"
        variant="ghost"
        leftIcon={<FaBook />}
        onClick={() => {
          router.push('/bookshelf');
        }}
      >
        個人書櫃
      </Button>
      <Button
        size="lg"
        variant="ghost"
        leftIcon={<FaSearch />}
        onClick={() => {
          router.push('/search');
        }}
      >
        探索
      </Button>

      <Button
        size="lg"
        variant="ghost"
        leftIcon={<MdLogout />}
        onClick={() => {
          dispatch(logout());
          router.push(`/`);
        }}
      >
        登出
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
              <MenuItem>個人資料</MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(logout());
                  router.push(`/`);
                }}
              >
                登出
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button
            onClick={() => {
              router.push('/login');
            }}
          >
            登入
          </Button>
        )} */}
    </Box>
  );
};

export default Header;
