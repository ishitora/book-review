import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useSWR from 'swr';
import { Box, Text, Stack, Button } from '@chakra-ui/react';

import AddReviewModal from '../../components/AddReviewModal';
import Description from './components/Description';
import Review from '@/components/common/Review';
import Ratings from '@/components/Ratings/Ratings';

import reviewServers from '@/servers/reviewServers';
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
        padding: '60px',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        '@media (max-width:780px)': {
          flexDirection: 'column',
        },
        // display: 'grid',
        // gridTemplateColumns: '3fr 4fr 2fr',
        // gridAutoRows: ' minmax(30px, auto)',
        // gridTemplateAreas: `
        // "title title title"
        // "image info other"
        // "description description other"
        // "rating rating other"
        // "reviews reviews other"
        // `,
      }}
    >
      <Box sx={{ flex: '0 0 300px' }}>
        <Box sx={{ position: 'sticky', top: 0 }}>
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

          <Box>想讀</Box>
          <AddReviewModal
            renderButton={(onClick) => <Button onClick={onClick}>阿阿</Button>}
            id={book.id}
          />
        </Box>
      </Box>

      <Box sx={{ flex: '0 0 1' }}>
        <Text sx={{ gridArea: 'title', fontSize: '1.6rem', fontWeight: 700 }}>
          {book.title}
        </Text>
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
        <Box sx={{ gridArea: 'other' }}>0人想看 0人正在閱讀 0人已看過</Box>
        <Box sx={{ gridArea: 'description' }}>
          <h3>內容簡介:</h3>

          <Description description={book.description} />
        </Box>

        <Box sx={{ gridArea: 'rating' }}>
          <Ratings ratings={book.ratings} />
        </Box>
        <Box sx={{ gridArea: 'reviews' }}>
          評論
          {reviews &&
            reviews.map((review) => <Review key={review.id} review={review} />)}
        </Box>
      </Box>
    </Box>
  );
};

export default BookDetail;
