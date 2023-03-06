import React from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

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
        '&:hover': {
          boxShadow: '0 0 8px #ccc',
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
        <Link
          sx={{
            margin: '8px 0',
          }}
          underline="hover"
          component={NextLink}
          href={`/book/${book.id}`}
        >
          {book.title}
        </Link>

        <Typography variant="body2">{book.authors}</Typography>
        <Typography variant="body1">{book.textSnippet}</Typography>

        <RatingDisplay rating={book.ratings} />
      </Stack>
    </Box>
  );
};

export default BookCard;
