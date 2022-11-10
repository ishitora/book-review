import React from 'react';
import { Box } from '@chakra-ui/react';
import { RatingDisplay } from '@/components/Ratings/Rating';
import type { TReview } from '@/types/review';
const Review = ({ review }: { review: TReview }) => {
  return (
    <Box sx={{ border: '1px solid #eee', padding: '20px' }}>
      <Box>{review.user.name}</Box>
      <Box>{review.title}</Box>
      <RatingDisplay rating={review.rating} />
      <Box>{review.content}</Box>
      <Box>{review.likes}個人喜歡</Box>
    </Box>
  );
};

export default Review;
