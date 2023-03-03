import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Controller } from 'react-hook-form';
import { Heading } from '@chakra-ui/react';
import { MdVpnKey, MdMail } from 'react-icons/md';

import Input from '@/components/common/Input';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useLoginForm from './hooks/useLoginForm';
import { signIn } from 'next-auth/react';
import CustomButton from '@/components/common/CustomButton';
import Box from '@mui/material/Box';

const Login = () => {
  const {
    onSubmit,
    control,
    errors,
    isDisplayPassword,
    toggleIsDisplayPassword,
    goHome,
  } = useLoginForm();

  return (
    <Box
      // bgColor="gray.100"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
      }}
    >
      <Box
        component="form"
        sx={{
          flex: '0 0 350px',
          height: '600px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '30px',
          '&>* + *': {
            marginTop: '12px',
          },
        }}
        onSubmit={onSubmit}
      >
        <Image
          src="/image/logo.svg"
          alt="main-logo"
          width={128}
          height={128}
          onClick={goHome}
          style={{
            cursor: 'pointer',
            alignSelf: 'center',
          }}
        />

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
                      aria-label="displayPassword"
                      onClick={toggleIsDisplayPassword}
                    >
                      {isDisplayPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
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
              />
            )}
          />
        </Box>
        <Box>
          還沒有帳號?<Link href="/signup">註冊</Link>
        </Box>

        <CustomButton sx={{ marginTop: '12px' }} type="submit">
          登入
        </CustomButton>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            '&>button': {
              flex: '0 0 48%',
            },
          }}
        >
          <CustomButton variant="common" onClick={() => signIn('google')}>
            <Image
              src="/image/google.png"
              alt="google image"
              width={20}
              height={20}
              style={{
                marginRight: '12px',
                display: 'flex',
                alignItems: 'center',
              }}
            />
            google登入
          </CustomButton>
          <CustomButton variant="common" onClick={() => signIn('facebook')}>
            <Image
              src="/image/facebook.png"
              alt="facebook image"
              width={20}
              height={20}
              style={{
                marginRight: '12px',
                display: 'flex',
                alignItems: 'center',
              }}
            />
            fb 登入
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
