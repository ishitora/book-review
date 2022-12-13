import React from 'react';
import NextLink from 'next/link';
import { Box, Stack, Link, Text } from '@chakra-ui/react';
import BookCard from './BookCard';
import Pagination from '@/components/Pagination/index';
import { TMyBook } from '@/types/book';
type Props = {
  books: TMyBook[];
  page: number;
  changePage: (p: number) => void;
};

const BookList = ({ books, page, changePage }: Props) => {
  const index = (page - 1) * 24;

  if (books.length === 0) {
    return (
      <Box sx={{ padding: '20px' }}>
        <Text sx={{ textAlign: 'center' }}>
          {' '}
          書櫃裡還沒有書籍，前往
          <Link
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              color(theme) {
                return theme.colors.primary.dark;
              },
            }}
            as={NextLink}
            href="/search"
          >
            探索頁面
          </Link>
          尋找書本
        </Text>
      </Box>
    );
  }

  return (
    <Stack spacing={5}>
      <Box
        sx={{
          margin: '20px auto',
          maxWidth: 'min(1000px,100%)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))',
          gridTemplateRows: 'repeat(2,1fr)',
          gap: '16px',
        }}
      >
        {books.slice(index, index + 24).map((info) => {
          return <BookCard key={info.book.id} info={info} />;
        })}
      </Box>
      <Pagination
        p={page}
        count={24}
        total={books.length}
        changePage={changePage}
      />
    </Stack>
  );
};

export default BookList;
