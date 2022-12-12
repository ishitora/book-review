import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Box, Stack } from '@chakra-ui/react';
import { RatingDisplay } from '@/components/Ratings/Rating';
import { TSearchBook } from '@/types/book';

const BookCard = ({ book }: { book: TSearchBook }) => {
  const router = useRouter();
  return (
    <Box
      onClick={() => {
        router.push(`/book/${book.id}`);
      }}
      sx={{
        padding: '16px',
        display: 'flex',
        border: '1px solid #eee',
        '&:not(:first-of-type)': {
          marginTop: '20px',
        },
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          flex: '0 0 100px',
          width: '100px',
          height: '120px',
          position: 'relative',
          marginRight: '20px',
        }}
      >
        <Image
          src={book?.image}
          fill
          alt={book.title + ' image'}
          style={{ objectFit: 'contain' }}
        />
      </Box>

      <Stack>
        <a
          onClick={() => {
            router.push(`/book/${book.id}`);
          }}
        >
          {book.title}
        </a>
        <a>{book.authors}</a>
        <p>{book.textSnippet}</p>

        <RatingDisplay rating={book.ratings} />
      </Stack>
    </Box>
  );
};

export default BookCard;
