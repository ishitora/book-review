import Search from '@/features/search/index';
import Head from 'next/head';
import { useRouter } from 'next/router';

const SearchPage = () => {
  const router = useRouter();
  const { keyword, p } = router.query;

  return (
    <>
      <Head>
        <title>
          搜尋關鍵字:{keyword} 第{p}頁 - book review
        </title>
      </Head>
      <Search />
    </>
  );
};

export default SearchPage;
