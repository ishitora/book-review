import React from 'react';
import Link from 'next/link';

import { Controller } from 'react-hook-form';
import { Box, Heading, IconButton } from '@chakra-ui/react';
import { MdVpnKey, MdMail } from 'react-icons/md';

import Input from '@/components/common/Input';
import { MdVisibilityOff, MdVisibility } from 'react-icons/md';
import useLoginForm from './hooks/useLoginForm';
import { signIn } from 'next-auth/react';
import CustomButton from '@/components/common/CustomButton';
const Login = () => {
  const {
    onSubmit,
    control,
    errors,
    isDisplayPassword,
    toggleIsDisplayPassword,
  } = useLoginForm();

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
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '30px 60px',
          '&>* + *': {
            marginTop: '12px',
          },
        }}
        onSubmit={onSubmit}
      >
        <Heading
          as="h3"
          size="lg"
          sx={{
            marginBottom: '20px',
          }}
        >
          登入book review
        </Heading>

        <Box>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                leftElement={{ ele: <MdMail style={{ fontSize: '24px' }} /> }}
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
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <Input
                leftElement={{ ele: <MdVpnKey style={{ fontSize: '24px' }} /> }}
                rightElement={{
                  ele: (
                    <IconButton
                      variant="unstyled"
                      aria-label="displayPassword"
                      onClick={toggleIsDisplayPassword}
                      icon={
                        isDisplayPassword ? (
                          <MdVisibilityOff style={{ fontSize: '24px' }} />
                        ) : (
                          <MdVisibility style={{ fontSize: '24px' }} />
                        )
                      }
                    ></IconButton>
                  ),
                }}
                id="password"
                type={isDisplayPassword ? 'text' : 'password'}
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
          {/* <Link href="/forgotPassword">忘記密碼</Link> */}
          還沒有帳號?<Link href="/signup">註冊</Link>
        </Box>
        <CustomButton onClick={() => signIn('google')}>
          使用google登入
        </CustomButton>
        <CustomButton onClick={() => signIn('facebook')}>
          使用facebook登入
        </CustomButton>
        <CustomButton type="submit">登入</CustomButton>
      </Box>
    </Box>
  );
};

export default Login;
