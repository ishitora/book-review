import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Pagination from '@/components/Pagination/index';
import BookCard from './BookCard';

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
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          書櫃裡還沒有書籍
        </Typography>
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
