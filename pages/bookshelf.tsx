import Bookshelf from '@/features/bookshelf';
import Head from 'next/head';

const BookshelfPage = () => {
  return (
    <>
      <Head>
        <title>我的書櫃</title>
      </Head>
      <Bookshelf />
    </>
  );
};

export default BookshelfPage;
