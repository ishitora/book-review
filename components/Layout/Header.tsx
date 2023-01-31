import React, { useState, useEffect, useRef } from 'react';
import { IconButton, Heading, useMediaQuery } from '@chakra-ui/react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import { pathName } from '@/constants/constant';
import SearchBar from '@/components/common/SearchBar';
import { getAccount } from '@/slices/accountSlice';
import { MdNavigateBefore, MdMenu } from 'react-icons/md';
import { useSession, signOut } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { logout } from '@/slices/accountSlice';
import CustomButton from '@/components/common/CustomButton';
import { Box } from '@mui/material';

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
  const [isMobile] = useMediaQuery('(max-width: 768px)', {
    ssr: true,
    fallback: true,
  });

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

      {account.isLogin && account.info ? (
        <>
          {' '}
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
            <MenuItem onClick={handleClose}>我的書櫃</MenuItem>
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
          //  size="lg"
          //  variant="ghost"
          variant="text"
          onClick={() => {
            dispatch(logout());
            signOut();
            router.push('/');
          }}
        >
          登入
        </CustomButton>
      )}
    </Box>
  );
};

export default Header;
