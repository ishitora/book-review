import React, { useState } from 'react';
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
import Input from '@/components/common/Input';
import { MdSearch } from 'react-icons/md';
const Header = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const account = useAppSelector((state) => state.account);

  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    if (keyword.trim() !== '') {
      router.push(`/search/${keyword.trim()}?p=1`);
      setKeyword('');
    }
  };

  return (
    <Box
      as="header"
      sx={{
        height: '90px',
        display: 'flex',
        alignItems: 'center',
        '@media screen and (max-width: 600px)': {
          flexWrap: 'wrap',
          height: '120px',
        },
        backgroundColor(theme) {
          return theme.colors.primary.dark;
        },
      }}
    >
      <Box
        sx={{
          flex: '0 0 170px',
          height: '80px',
          position: 'relative',
          '@media screen and (max-width: 600px)': {
            height: '60px',
            flex: '0 0 100%',
          },
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
      <Box
        sx={{
          flex: 1,
          padding: '0 16px',
          '@media screen and (max-width: 600px)': {
            flex: '0 0 100%',
            marginBottom: '8px',
          },
          '& svg': {
            fontSize: '24px',
            cursor: 'pointer',
          },
        }}
      >
        <Input
          noHelpText
          placeholder="搜尋書本"
          value={keyword}
          onChange={handleChange}
          rightElement={{
            width: '70px',
            ele: <MdSearch onClick={handleSearch} />,
          }}
        />
      </Box>
      <Box
        sx={{
          padding: '0 16px',
          flex: '0 0 auto',
          display: 'flex',
          justifyContent: 'flex-end',
          '@media screen and (max-width: 600px)': {
            display: 'none',
          },
        }}
      >
        {account.isLogin && account.info ? (
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<Avatar size="sm" />}
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
              <MenuItem
                onClick={() => {
                  router.push('/bookshelf');
                }}
              >
                個人書櫃
              </MenuItem>
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
        )}
      </Box>
    </Box>
  );
};

export default Header;
