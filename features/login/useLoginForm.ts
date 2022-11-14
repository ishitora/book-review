import { useAppDispatch } from '@/hooks/redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '@/slices/accountSlice';
import { useRouter } from 'next/router';

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
    dispatch(login(data)).then(() => {
      router.push('/');
    });
  });

  return {
    onSubmit,
    control,
    errors,
  };
};

export default useLoginForm;
