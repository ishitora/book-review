import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import SearchBar from '@/components/common/SearchBar';
import { getAccount } from '@/slices/accountSlice';

import { useSession, signOut } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { logout } from '@/slices/accountSlice';
import CustomButton from '@/components/common/CustomButton';
import Box from '@mui/material/Box';

const Header = ({ toggle }: { toggle: () => void }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account);
  const router = useRouter();

  const { status } = useSession();
  const isLogining = useRef(true);

  useEffect(() => {
    if (isLogining.current) {
      if (status === 'authenticated' || status === 'unauthenticated') {
        dispatch(getAccount());
        isLogining.current = false;
      }
    }
  }, [status, dispatch]);

  return (
    <Box
      component="header"
      sx={{
        height: '70px',
        borderBottom: '2px solid #eee',
        '@media (max-width: 600px)': {
          height: '140px',
        },
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '12px 20px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '2px solid #eee',

          '@media (min-width: 600px)': {
            '&>* + *': {
              marginLeft: '12px',
            },
          },
          '@media (max-width: 600px)': {
            justifyContent: 'space-between',
            padding: '12px',
            flexWrap: 'wrap',
            height: '140px',
          },
        }}
      >
        <Box
          sx={{
            '@media (min-width: 600px)': {
              marginRight: '40px',
            },
          }}
        >
          <Image
            src="/image/logo.svg"
            alt="main-logo"
            width={64}
            height={64}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              router.push('/');
            }}
          />
        </Box>

        <SearchBar />

        {account.isLogin && account.info ? (
          <>
            <CustomButton
              startIcon={
                <Avatar alt="user icon" src={account.info.avatar}>
                  {account.info.name}
                </Avatar>
              }
              variant="text"
              onClick={handleClick}
            >
              <Box
                component="span"
                sx={{
                  maxWidth: '100px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {account.info.name}
              </Box>
            </CustomButton>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem
                onClick={() => {
                  router.push('/bookshelf');
                  handleClose();
                }}
              >
                我的書櫃
              </MenuItem>
              <MenuItem onClick={handleClose}>個人資料</MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(logout());
                  signOut();
                  router.push('/');
                  handleClose();
                }}
              >
                登出
              </MenuItem>
            </Menu>
          </>
        ) : (
          <CustomButton
            variant="text"
            onClick={() => {
              router.push('/login');
            }}
          >
            登入
          </CustomButton>
        )}
      </Box>
    </Box>
  );
};

export default Header;
