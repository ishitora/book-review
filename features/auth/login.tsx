import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Controller } from 'react-hook-form';

import { MdVpnKey, MdMail } from 'react-icons/md';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';

import Input from '@/components/common/Input';
import CustomButton from '@/components/common/CustomButton';

import useLoginForm from './hooks/useLoginForm';
import { signIn } from 'next-auth/react';

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
      sx={{
        backgroundColor: '#f8f8f8',
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

        <Typography
          variant="h5"
          sx={{
            marginBottom: '20px',
          }}
        >
          登入book review
        </Typography>

        <Box>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                fullWidth
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
                fullWidth
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

        <CustomButton
          sx={{ marginTop: '12px' }}
          variant="common"
          onClick={() => signIn('google')}
        >
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
        {/* <CustomButton variant="common" onClick={() => signIn('facebook')}>
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
          </CustomButton> */}
      </Box>
    </Box>
  );
};

export default Login;
