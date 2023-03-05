import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import BookStatusDialog from '@/components/BookStatusDialog/index';
import { bookshelfStatus } from '@/constants/constant';
import { RatingDisplay } from '@/components/Ratings/Rating';
import { useAppSelector } from '@/hooks/redux';

import { TMyBook } from '@/types/book';
import { useRouter } from 'next/router';
import CustomButton from '@/components/common/CustomButton';

type Props = {
  info: TMyBook;
};

const BookCard = ({ info }: Props) => {
  const { book, status } = info;
  const reviews = useAppSelector((state) => state.reviews);
  const router = useRouter();

  return (
    <Box
      sx={{
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
      <Stack
        alignItems="center"
        sx={{
          '&>a': {
            display: '-webkit-box',
            textOverflow: ' ellipsis',
            overflow: 'hidden',
            lineClamp: 1,
            WebkitLineClamp: 1,
            boxOrient: 'vertical',
            WebkitBoxOrient: 'vertical',
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
              router.push(`/myBooks/${book.id}`);
            }}
          />
        </Box>
        <Link
          sx={{
            fontSize: '16px',
            fontWeight: 500,
            margin: '8px 0',
          }}
          underline="hover"
          component={NextLink}
          href={`/myBooks/${book.id}`}
        >
          {book.title}
        </Link>
        <RatingDisplay rating={reviews[book.id]?.rating || 0} />
        <BookStatusDialog
          id={book.id}
          renderButton={(onClick) => (
            <CustomButton
              variant="outlined"
              onClick={onClick}
              sx={{
                width: '120px',
                padding: '3px 10px',
              }}
            >
              {bookshelfStatus[status]}
            </CustomButton>
          )}
          status={status}
        />
      </Stack>
    </Box>
  );
};

export default BookCard;
