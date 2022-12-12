import Head from 'next/head';
import Login from '@/features/auth/login';

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>登入 book review</title>
      </Head>
      <Login />
    </>
  );
};

export default LoginPage;
