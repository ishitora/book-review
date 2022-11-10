import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Box } from '@chakra-ui/react';
import { RatingDisplay } from '@/components/Ratings/Rating';
import { TBookCard } from '../types';

const BookCard = ({ book }: { book: TBookCard }) => {
  const router = useRouter();
  return (
    <Box
      onClick={() => {
        router.push(`/book/${book.id}`);
      }}
      sx={{
        border: '1px solid #eee',
        '&:not(:first-child)': {
          marginTop: '20px',
        },
      }}
    >
      <Image
        src={book?.image}
        width={80}
        height={80}
        alt={book.title + ' image'}
      />
      <a
        onClick={() => {
          router.push(`/book/${book.id}`);
        }}
      >
        {' '}
        {book.title}
      </a>

      {book.authors}
      {book.textSnippet}
      <RatingDisplay rating={book.ratings} />
    </Box>
  );
};

export default BookCard;
