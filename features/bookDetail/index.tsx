import React from 'react';
import Image from 'next/image';
import useSWR from 'swr';

import { useAppSelector } from '@/hooks/redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import AddReviewDialog from '@/components/AddReviewDialog';
import BookStatusDialog from '@/components/BookStatusDialog';
import Description from './components/Description';
import Review from '@/components/common/Review';
import Ratings from '@/components/Ratings/Ratings';
import CustomButton from '@/components/common/CustomButton';
import UnderlineTitle from '@/components/common/UnderlineTitle';

import { CATEGORIES } from '@/constants/constant';

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
            <AddReviewDialog
              renderButton={(onClick) => (
                <CustomButton variant="outlined" onClick={onClick}>
                  新增評論
                </CustomButton>
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
        <Typography variant="h4">{book.title}</Typography>
        <Stack sx={{ gridArea: 'info' }}>
          <Typography>
            作者:
            {book.authors.map((author) => (
              <a key={author}>{author}</a>
            ))}
          </Typography>
          <Typography>出版社:{book.publisher}</Typography>
          {book.ISBN && <Typography> ISBN:{book.ISBN}</Typography>}
          {book.publishedDate && (
            <Typography>出版日期:{book.publishedDate}</Typography>
          )}
          {book.category && (
            <Typography>
              分類:{CATEGORIES[book.category] || book.category}
            </Typography>
          )}
          {/* {book.price && <Typography>建議售價:{book.price}</Typography>} */}
          {book.pageCount && <Typography> 頁數:{book.pageCount}</Typography>}
        </Stack>
        {/* <Box sx={{ gridArea: 'other' }}>0人想看 0人正在閱讀 0人已看過</Box> */}
        <Box sx={{ gridArea: 'description' }}>
          <Box sx={{ padding: '20px 0' }}>
            <UnderlineTitle variant="h5">內容簡介</UnderlineTitle>
            <Description description={book.description} />
          </Box>
        </Box>

        <Box sx={{ gridArea: 'rating' }}>
          <UnderlineTitle variant="h5">評分</UnderlineTitle>
          <Ratings
            ratings={
              reviews
                ? reviews.map((review) => ({ rating: review.rating }))
                : []
            }
          />
        </Box>
        <Box sx={{ gridArea: 'reviews' }}>
          <UnderlineTitle
            variant="h5"
            sx={{
              margin: '12px 0',
            }}
          >
            書評
          </UnderlineTitle>

          <Box sx={{ '&>* + *': { marginTop: '12px' }, padding: '12px' }}>
            {reviews && reviews?.length > 0 ? (
              reviews.map((review) => (
                <Review key={review.id} review={review} />
              ))
            ) : (
              <Typography>
                目前還沒有書評，成為第一個
                <AddReviewDialog
                  renderButton={(onClick) => (
                    <CustomButton
                      variant="text"
                      onClick={onClick}
                      sx={{ padding: '0', fontSize: '1rem', border: 'none' }}
                    >
                      發表書評
                    </CustomButton>
                  )}
                  afterSubmit={() => {
                    mutate();
                  }}
                  id={book.id}
                />
                的人
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BookDetail;
