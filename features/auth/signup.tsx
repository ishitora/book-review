import React from 'react';
import Link from 'next/link';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { MdVpnKey, MdMail, MdAccountCircle } from 'react-icons/md';

import Input from '@/components/common/Input';
import { Controller } from 'react-hook-form';

import useSignup from './hooks/useSignup';

const Signup = () => {
  const { control, errors, onSubmit, isSignup, goToLogin } = useSignup();

  return (
    <Box
      bgColor="gray.100"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
      }}
    >
      <Box
        as="form"
        sx={{
          flex: '0 0 350px',
          height: '550px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '30px 60px',
        }}
        onSubmit={onSubmit}
      >
        {isSignup ? (
          <>
            <Heading
              as="h3"
              size="lg"
              colorScheme="primary"
              sx={{
                marginBottom: '20px',
              }}
            >
              註冊成功
            </Heading>
            <Text>請到登入頁面登入</Text>
            <Button onClick={goToLogin}>前往登入頁</Button>
          </>
        ) : (
          <>
            <Heading
              as="h3"
              size="lg"
              colorScheme="primary"
              sx={{
                marginBottom: '20px',
              }}
            >
              加入book review
            </Heading>
            <Box>
              信箱
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    leftElement={{
                      ele: <MdMail style={{ fontSize: '24px' }} />,
                    }}
                    id="email"
                    placeholder="輸入電子信箱"
                    errorMessage={errors.email?.message}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    size="lg"
                  />
                )}
              />
            </Box>
            <Box>
              名字
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    leftElement={{
                      ele: <MdAccountCircle style={{ fontSize: '24px' }} />,
                    }}
                    id="name"
                    placeholder="輸入您的暱稱"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    size="lg"
                  />
                )}
              />
            </Box>
            <Box>
              密碼
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <Input
                    leftElement={{
                      ele: <MdVpnKey style={{ fontSize: '24px' }} />,
                    }}
                    id="password"
                    type="password"
                    placeholder="輸入密碼"
                    errorMessage={errors.password?.message}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    name={name}
                    size="lg"
                  />
                )}
              />
            </Box>
            <Box>
              確認密碼
              <Controller
                name="confirmPassword"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <Input
                    leftElement={{
                      ele: <MdVpnKey style={{ fontSize: '24px' }} />,
                    }}
                    id="confirmPassword"
                    type="password"
                    placeholder="再次輸入密碼"
                    errorMessage={errors.confirmPassword?.message}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    name={name}
                    size="lg"
                  />
                )}
              />
            </Box>
            <Box>
              已有帳號?
              <Link href="/login">登入</Link>
            </Box>
            <Button type="submit">註冊</Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Signup;
