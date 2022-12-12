import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Pagination from '@/components/Pagination/index';
import { Box } from '@chakra-ui/react';
import { fetcher } from '@/servers/API';
import { TSearchBook } from '@/types/book';
import BookCard from './components/BookCard';
import SearchSkeleton from './components/SearchSkeleton';

const Search = () => {
  const router = useRouter();
  const { keyword, p } = router.query;

  const { data } = useSWR<{ total: number; books: TSearchBook[] }, Error>(
    keyword && p ? `/api/search/${keyword}?p=${p}` : null,
    fetcher<any>
  );

  const changePage = (page: number) => {
    if (typeof keyword === 'string') {
      if (keyword.trim() !== '') {
        router.push(`/search/${keyword.trim()}?p=${page}`);
      }
    }
  };

  if (!data) {
    return <SearchSkeleton />;
  }

  return (
    <Box>
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
    </Box>
  );
};

export default Search;
