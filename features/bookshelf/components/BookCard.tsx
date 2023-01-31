import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { Stack, Box, Link } from '@chakra-ui/react';
import BookStatusDialog from '@/components/BookStatusDialog/index';
import { bookshelfStatus } from '@/constants/constant';
import { RatingDisplay } from '@/components/Ratings/Rating';
import { useAppSelector } from '@/hooks/redux';
import { MdModeEditOutline } from 'react-icons/md';
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
        align="center"
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
            height: '160px',
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
            fontWeight: 600,
          }}
          as={NextLink}
          href={`/myBooks/${book.id}`}
        >
          {book.title}
        </Link>
        <RatingDisplay rating={reviews[book.id]?.rating || 0} />
        <BookStatusDialog
          id={book.id}
          renderButton={(onClick) => (
            <CustomButton
              //  rightIcon={<MdModeEditOutline />}
              // variant="outline"
              onClick={onClick}
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
