import React from 'react';
import Link from 'next/link';

import { Controller } from 'react-hook-form';
import { Box, Button } from '@chakra-ui/react';
import { MdVpnKey, MdMail } from 'react-icons/md';
import Input from '@/components/common/Input';

import useLoginForm from './useLoginForm';

const Login = () => {
  const { onSubmit, control, errors } = useLoginForm();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&>form': {
          flex: '0 0 500px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '&>div + div': {
            marginTop: '16px',
          },
        },
      }}
    >
      <form onSubmit={onSubmit}>
        <h4>使用帳號登入book review</h4>
        <Box>
          信箱
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
          密碼
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <Input
                leftElement={{ ele: <MdVpnKey style={{ fontSize: '24px' }} /> }}
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
          忘記密碼 還沒有帳號?
          <Link href="/signup">
            <a>註冊</a>
          </Link>
        </Box>

        <Button type="submit">登入</Button>
      </form>
    </Box>
  );
};

export default Login;
