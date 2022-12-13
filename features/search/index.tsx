import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Pagination from '@/components/Pagination/index';
import { Box, Text } from '@chakra-ui/react';
import { fetcher } from '@/servers/API';
import { TSearchBook } from '@/types/book';
import BookCard from './components/BookCard';
import SearchSkeleton from './components/SearchSkeleton';

const Search = () => {
  const router = useRouter();
  const { keyword, p } = router.query;

  const { data } = useSWR<{ total: number; books: TSearchBook[] }, Error>(
    keyword && p ? `/api/search/${keyword}?p=${p}` : null,
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
        <Text
          as="span"
          sx={{
            fontWeight: 600,
            color(theme) {
              return theme.colors.primary.main;
            },
          }}
        >
          {keyword}
        </Text>
        {data ? (
          <>
            {' '}
            共
            <Text
              as="span"
              sx={{
                fontWeight: 600,
                color(theme) {
                  return theme.colors.primary.main;
                },
              }}
            >
              {data.total}
            </Text>
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
            找不到{' '}
            <Text
              as="span"
              sx={{
                fontWeight: 600,
                color(theme) {
                  return theme.colors.primary.main;
                },
              }}
            >
              {keyword}
            </Text>{' '}
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
      ) : (
        <SearchSkeleton />
      )}
    </Box>
  );
};

export default Search;
