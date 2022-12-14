import React from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { Box, Text, Stack, Button, Heading, Divider } from '@chakra-ui/react';
import { useAppSelector } from '@/hooks/redux';

import AddReviewModal from '@/components/AddReviewModal';
import BookStatusDialog from '../../components/BookStatusDialog';
import Description from './components/Description';
import Review from '@/components/common/Review';
import Ratings from '@/components/Ratings/Ratings';

import reviewServers from '@/servers/reviewServers';

import type { TBookDetail } from '@/types/book';
import type { TReview } from '@/types/review';

const BookDetail = ({ book }: { book: TBookDetail }) => {
  const myBooks = useAppSelector((state) => state.account?.info?.myBooks) || [];

  const findStatus = myBooks.find(
    (myBook) => myBook.book.id === book.id
  )?.status;
  const status = typeof findStatus === 'number' ? findStatus : null;

  const { data: reviews, mutate } = useSWR<TReview[], Error>(
    book.id,
    reviewServers.getReviewsById
  );

  return (
    <Box
      sx={{
        padding: '60px',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
        gap: '36px',
        '@media (max-width:780px)': {
          gridTemplateColumns: '1fr',
          padding: '30px',
        },
        '@media (max-width:600px)': {
          gridTemplateColumns: '1fr',
          padding: '20px',
        },
      }}
    >
      <Box sx={{ justifySelf: 'center' }}>
        <Box sx={{ position: 'sticky', top: 0 }}>
          <Stack spacing="20px">
            <Box
              sx={{
                position: 'relative',
                width: '240px',
                height: '330px',
                overflow: 'hidden',
                boxShadow: ' rgba(0, 0, 0, 0.35) 0px 5px 15px',
                borderRadius: '0 8px 8px 0',
              }}
            >
              <Image
                src={book?.image}
                fill
                alt={book.image + ' image'}
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <BookStatusDialog id={book.id} status={status} />
            <AddReviewModal
              renderButton={(onClick) => (
                <Button onClick={onClick}>新增評論</Button>
              )}
              afterSubmit={() => {
                mutate();
              }}
              id={book.id}
            />
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          flex: '0 0 1',
          '&> * + *': {
            marginTop: '20px',
          },
        }}
      >
        <Heading as="h2" size="2xl">
          {book.title}
        </Heading>
        <Stack sx={{ gridArea: 'info' }}>
          <Text>
            {book.authors.map((author) => (
              <a key={author}>{author}</a>
            ))}
          </Text>
          <Text>出版社:{book.publisher}</Text>
          {book.ISBN && <Text> ISBN:{book.ISBN}</Text>}
          {book.publishedDate && <Text>出版日期:{book.publishedDate}</Text>}
          {book.categories?.length > 0 && (
            <Text>
              類別:
              {book.categories.map((category) => (
                <a key={category}>{category}</a>
              ))}
            </Text>
          )}
          {book.price && <Text>建議售價:{book.price}</Text>}
          {book.pageCount && <Text> 頁數:{book.pageCount}</Text>}
        </Stack>
        {/* <Box sx={{ gridArea: 'other' }}>0人想看 0人正在閱讀 0人已看過</Box> */}
        <Box sx={{ gridArea: 'description' }}>
          <Box sx={{ padding: '20px 0' }}>
            <Heading as="h4" size="md">
              內容簡介
            </Heading>
            <Description description={book.description} />
          </Box>
        </Box>

        <Box sx={{ gridArea: 'rating' }}>
          <Heading as="h4" size="md">
            評分
          </Heading>
          <Ratings
            ratings={
              reviews
                ? reviews.map((review) => ({ rating: review.rating }))
                : []
            }
          />
        </Box>
        <Box sx={{ gridArea: 'reviews' }}>
          <Heading
            as="h4"
            size="md"
            sx={{
              margin: '12px 0',
            }}
          >
            評論
          </Heading>
          <Divider />
          <Box sx={{ '&>* + *': { marginTop: '12px' }, padding: '12px' }}>
            {reviews &&
              reviews.map((review) => (
                <Review key={review.id} review={review} />
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BookDetail;
