import React from 'react';

import { Box, Stack } from '@chakra-ui/react';
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
  return (
    <Stack spacing={5}>
      <Box
        sx={{
          maxWidth: '1200px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))',
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
