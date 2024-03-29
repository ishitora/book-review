import { useAppDispatch } from '@/hooks/redux';
import { useForm } from 'react-hook-form';
import { useBoolean } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '@/slices/accountSlice';

import { openSnackbar } from '@/slices/snackbarSlice';

type LoginData = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email('必須為合法信箱').required('必填'),
  password: yup.string().required('必填'),
});

const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isDisplayPassword, setIsDisplayPassword] = useBoolean();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginData>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    dispatch(login(data))
      .unwrap()
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        dispatch(openSnackbar({ message: error.message || '發生錯誤' }));
      });
  });

  return {
    onSubmit,
    control,
    errors,
    isDisplayPassword,
    toggleIsDisplayPassword: setIsDisplayPassword.toggle,
    goHome: () => {
      router.push('/');
    },
  };
};

export default useLoginForm;
