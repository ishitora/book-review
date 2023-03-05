import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

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
          height: '200px',
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
            objectFit: 'contain',
            cursor: 'pointer',
          }}
          onClick={() => {
            router.push(`/book/${book.id}`);
          }}
        />
      </Box>
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
      <Typography
        sx={{
          display: 'box',
          wordBreak: 'break-all',
          maxHeight: '2.4em',
          lineHeight: '1.2em',
          overflow: 'hidden',
          margin: 0,
        }}
        variant="body1"
      >
        {book.authors[0] || ''}
      </Typography>
    </Box>
  );
};

export default BookCard;
