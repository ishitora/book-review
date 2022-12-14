import MyBook from '@/features/myBook/index';
import Head from 'next/head';
const MyBookPage = () => {
  return (
    <>
      <Head>
        <title>閱讀紀錄</title>
      </Head>
      <MyBook />
    </>
  );
};

export default MyBookPage;
