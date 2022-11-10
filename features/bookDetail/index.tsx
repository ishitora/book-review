import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useSWR from 'swr';
import { Box, Text, Stack, Button } from '@chakra-ui/react';
import AddReviewModal from './components/AddReviewModal';
import reviewServers from '@/servers/reviewServers';

import Review from '@/components/common/Review';
import Ratings from '@/components/Ratings/Ratings';
import type { TBookDetail } from '@/types/book';
import type { TReview } from '@/types/review';
const BookDetail = ({ book }: { book: TBookDetail }) => {
  console.log(book);
  const router = useRouter();

  const { data: reviews } = useSWR<TReview[], Error>(
    book.id,
    reviewServers.getReviewsById
  );

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        margin: '0 auto',

        display: 'grid',
        gridTemplateColumns: '3fr 4fr 2fr',
        gridAutoRows: ' minmax(30px, auto)',
        gridTemplateAreas: `
        "title title title"
        "image info other"
        "description description other"
        "rating rating other"
        "reviews reviews other"
        `,
      }}
    >
      <Text sx={{ gridArea: 'title', fontSize: '1.6rem', fontWeight: 700 }}>
        {book.title}
      </Text>
      <Box sx={{ gridArea: 'image' }}>
        <Image
          src={book?.image}
          width={200}
          height={200}
          style={{ objectFit: 'contain' }}
          alt={book.image + ' image'}
        />
      </Box>

      <Stack sx={{ gridArea: 'info' }}>
        <Text>
          作者:
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
        {book.price && <Text> 建議售價:{book.price}</Text>}
        {book.pageCount && <Text> 頁數:{book.pageCount}</Text>}
      </Stack>

      <Box sx={{ gridArea: 'description' }}>
        <h3>內容簡介:</h3>
        <Box
          sx={{
            fontSize: '0.9rem',
            wordBreak: 'break-all',
            whiteSpace: 'pre-line',
          }}
        >
          {book.description}
        </Box>
      </Box>

      <Box sx={{ gridArea: 'rating' }}>
        <Ratings ratings={book.ratings} />
      </Box>
      <Box sx={{ gridArea: 'reviews' }}>
        評論
        <AddReviewModal id={book.id} />
        {reviews &&
          reviews.map((review) => <Review key={review.id} review={review} />)}
      </Box>

      <Box sx={{ gridArea: 'other' }}>0人想看 0人正在閱讀 0人已看過</Box>
    </Box>
  );
};

export default BookDetail;
