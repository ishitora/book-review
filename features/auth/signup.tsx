import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { MdVpnKey, MdMail, MdAccountCircle } from 'react-icons/md';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@/components/common/Input';
import { Controller } from 'react-hook-form';
import CustomButton from '@/components/common/CustomButton';
import useSignup from './hooks/useSignup';

const Signup = () => {
  const { control, errors, onSubmit, isSignup, goToLogin, goHome } =
    useSignup();
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
          height: '650px',
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

        {isSignup ? (
          <>
            <Image
              src="/image/success.gif"
              width={300}
              height={200}
              alt="signup success"
            />
            <Typography
              variant="h5"
              sx={{
                color: 'primary.main',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              註冊成功
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
              }}
            >
              感謝您的註冊，請至登入頁面登入
            </Typography>
            <CustomButton
              sx={{
                marginTop: 'auto',
                padding: '12px',
              }}
              onClick={goToLogin}
            >
              前往登入頁
            </CustomButton>
          </>
        ) : (
          <>
            <Typography
              sx={{
                marginBottom: '20px',
              }}
            >
              加入book review
            </Typography>
            <Box>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    fullWidth
                    leftElement={{
                      ele: <MdMail style={{ fontSize: '24px' }} />,
                    }}
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
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    fullWidth
                    leftElement={{
                      ele: <MdAccountCircle style={{ fontSize: '24px' }} />,
                    }}
                    id="name"
                    placeholder="輸入您的暱稱"
                    errorMessage={errors.name?.message}
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
                  />
                )}
              />
            </Box>
            <Box>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <Input
                    fullWidth
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
                  />
                )}
              />
            </Box>
            <Box>
              已有帳號?
              <Link href="/login">登入</Link>
            </Box>
            <CustomButton sx={{ marginTop: '12px' }} type="submit">
              註冊
            </CustomButton>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Signup;
