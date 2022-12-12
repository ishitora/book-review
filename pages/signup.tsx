import Head from 'next/head';
import Signup from '@/features/auth/signup';

const SignupPage = () => {
  return (
    <>
      <Head>
        <title>註冊 book review 帳號</title>
      </Head>
      <Signup />
    </>
  );
};

export default SignupPage;
