import React from 'react';
import Link from 'next/link';
import { Box, Button } from '@chakra-ui/react';
import { MdVpnKey, MdMail, MdAccountCircle } from 'react-icons/md';
import Input from '@/components/common/Input';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '@/hooks/redux';
import { signup } from '@/slices/accountSlice';

type SigninData = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

const schema = yup
  .object({
    email: yup.string().email('必須為合法信箱').required('必填'),
    password: yup.string().required('必填'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], '密碼不一致')
      .required('必填'),
  })
  .required();

const Signup = () => {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SigninData>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    const { email, name, password } = data;
    dispatch(signup({ email, name, password }));
  });

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
        <h4>加入book review</h4>
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
          確認密碼
          <Controller
            name="confirmPassword"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <Input
                leftElement={{ ele: <MdVpnKey style={{ fontSize: '24px' }} /> }}
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
          忘記密碼 已有帳號?
          <Link href="/login">登入</Link>
        </Box>

        <Button type="submit">註冊</Button>
      </form>
    </Box>
  );
};

export default Signup;
