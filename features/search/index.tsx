import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Pagination from '@/components/Pagination/index';

import { fetcher } from '@/servers/API';
import { TSearchBook } from '@/types/book';
import BookCard from './components/BookCard';
import SearchSkeleton from './components/SearchSkeleton';
import Box from '@mui/material/Box';

const Search = () => {
  const router = useRouter();
  const { keyword, p } = router.query;

  const { data } = useSWR<{ total: number; books: TSearchBook[] }, Error>(
    keyword && p ? `/api/search?keyword=${keyword}&p=${p}` : null,
    fetcher<{ total: number; books: TSearchBook[] }>
  );
  const changePage = (page: number) => {
    if (typeof keyword === 'string') {
      if (keyword.trim() !== '') {
        router.push(`/search/${keyword.trim()}?p=${page}`);
      }
    }
  };

  return (
    <Box>
      <Box>
        搜尋關鍵字：
        {keyword}
        {data ? (
          <>
            {' '}
            共{data.total}
            筆結果
          </>
        ) : (
          ''
        )}
        {data && Number(p) > 0
          ? ` 第${p} / ${Math.ceil(data.total / 10)}頁`
          : ' '}
      </Box>
      {data ? (
        data.total === 0 ? (
          <Box sx={{ padding: '20px 0' }}>
            找不到 {keyword}
            相關結果
          </Box>
        ) : (
          <>
            <Box sx={{ padding: '20px 0' }}>
              {data?.books?.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </Box>
            <Pagination
              p={Number(p)}
              total={data?.total}
              count={10}
              changePage={changePage}
            />
          </>
        )
      ) : null}
    </Box>
  );
};

export default Search;
