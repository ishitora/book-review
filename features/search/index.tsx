import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Pagination from '@/components/Pagination/index';

import { fetcher } from '@/servers/API';
import { TSearchBook } from '@/types/book';
import BookCard from './components/BookCard';
import SearchSkeleton from './components/SearchSkeleton';
import CatelogyList from './components/CatelogyList';
import Box from '@mui/material/Box';

type TSearch = {
  total: number;
  count: number;
  books: TSearchBook[];
};

const Search = () => {
  const router = useRouter();
  const { keyword, p, catelogy } = router.query;

  const { data } = useSWR<TSearch, Error>(
    keyword && p
      ? `/api/search?keyword=${keyword}&p=${p}${
          catelogy ? `&catelogy=${catelogy}` : ``
        }`
      : null,
    fetcher<TSearch>
  );
  const changePage = (page: number) => {
    if (typeof keyword === 'string') {
      if (keyword.trim() !== '') {
        router.push(
          `/search?keyword=${keyword.trim()}&p=${page}${
            catelogy ? `&catelogy=${catelogy}` : ``
          }`
        );
      }
    }
  };

  return (
    <Box
      sx={{
        maxWidth: '1280px',
        margin: '0 auto',
        '&>div': {
          padding: '20px 40px',
          '@media (max-width:768px)': {
            padding: '10px 20px',
          },
        },
      }}
    >
      <Box>
        搜尋關鍵字：
        {keyword}
        {data ? (
          <>
            {' '}
            共{data.count}
            筆結果
          </>
        ) : (
          ''
        )}
        {data && Number(p) > 0
          ? ` 第${p}/${Math.ceil(data.count / 10)}頁`
          : ' '}
      </Box>
      {data ? (
        data.count === 0 ? (
          <Box sx={{ padding: '20px 0' }}>
            找不到 {keyword}
            相關結果
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: '20px',
              gridTemplateAreas: `'catelogyList bookList'
                                'catelogyList pagination'`,
              padding: '40px',
              '@media (max-width:768px)': {
                display: 'flex',
                flexDirection: 'column',
              },
            }}
          >
            <CatelogyList total={data?.total} categories={data.categories} />

            <Box>
              {data?.books?.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </Box>
            <Pagination
              p={Number(p)}
              total={data?.count}
              count={10}
              changePage={changePage}
            />
          </Box>
        )
      ) : (
        <SearchSkeleton />
      )}
    </Box>
  );
};

export default Search;
