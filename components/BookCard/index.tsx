import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';

type Props = {};

const BookCard = ({ book }) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        width: '150px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        '&>a': {
          display: '-webkit-box',
          textOverflow: ' ellipsis',
          overflow: 'hidden',
          lineClamp: 1,
          WebkitLineClamp: 1,
          boxOrient: 'vertical',
          WebkitBoxOrient: 'vertical',
        },
        '&>p': {
          fontSize: '12px',
        },
        '&:hover': {
          '& img': {
            filter: 'brightness(0.8)',
          },
          '& a': {
            textDecoration: 'underline',
          },
        },
      }}
    >
      <Box
        sx={{
          width: '150px',
          height: '220px',
          position: 'relative',
          '&>img:hover': {
            filter: 'brightness(0.8)',
          },
        }}
      >
        <Image
          src={book.image}
          alt={book.title}
          fill
          style={{
            objectFit: 'cover',
            cursor: 'pointer',
          }}
          onClick={() => {
            router.push(`/book/${book.id}`);
          }}
        />
      </Box>
      <Link href={`/book/${book.id}`}>{book.title}</Link>
      <p>{book.authors.map((author) => author)}</p>
    </Box>
  );
};

export default BookCard;
