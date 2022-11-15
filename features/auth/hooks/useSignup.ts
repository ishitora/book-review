import { useState } from 'react';
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import accountServers from '@/servers/accountServers';

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

const useSignup = () => {
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();
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
    accountServers.signup({ email, name, password }).then(() => {
      setIsSignup(true);
    });
  });

  const goToLogin = () => {
    router.push('/login');
  };

  return { control, errors, onSubmit, isSignup, goToLogin };
};

export default useSignup;
