import Head from 'next/head';
import { useRouter } from 'next/router';

const SearchPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>搜尋關鍵字</title>
      </Head>
      <div>搜尋</div>
    </>
  );
};

export default SearchPage;
