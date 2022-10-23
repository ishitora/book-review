import React, { useState } from 'react';
import Image from 'next/image';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { logout } from '@/slices/accountSlice';
import Input from '@/components/common/Input';

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
    }
  };

  return (
    <Box
      as="header"
      h="90"
      display="flex"
      alignItems="center"
      bgColor="#f2f2f2"
    >
      <Image
        src="/image/logo.png"
        width={170}
        height={80}
        alt="logor"
        onClick={() => {
          router.push('/');
        }}
      />
      <Box flex="1">
        <Input
          placeholder="搜尋書本"
          value={keyword}
          onChange={handleChange}
          rightElement={{
            width: '70px',
            ele: (
              <Button width="70px" colorScheme="blue" onClick={handleSearch}>
                搜尋
              </Button>
            ),
          }}
        />
      </Box>
      <Box
        sx={{
          flex: '0 0 400px',
          '@media screen and (max-width: 600px)': {
            display: 'none',
          },
        }}
      >
        {account.isLogin ? (
          <Menu>
            <MenuButton>{account.info.name}</MenuButton>
            <MenuList>
              <MenuItem>個人書櫃</MenuItem>
              <MenuItem>個人資料</MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(logout());
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
