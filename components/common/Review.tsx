import React from 'react';
import { Box, Avatar, Heading, Text } from '@chakra-ui/react';
import { RatingDisplay } from '@/components/Ratings/Rating';
import type { TReview } from '@/types/review';
const Review = ({ review }: { review: TReview }) => {
  return (
    <Box sx={{ borderBottom: '2px solid #ddd', padding: '20px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar size="sm" />
        {review.user.name}
      </Box>

      <RatingDisplay rating={review.rating} />
      <Box sx={{ padding: '12px 0' }}>
        {' '}
        <Heading
          as="h4"
          size="md"
          sx={{
            color(theme) {
              return theme.colors.primary[800];
            },
          }}
        >
          {review.title}
        </Heading>
        <Text>{review.content}</Text>
      </Box>

      {/* <Box>{review.likes}個人喜歡</Box> */}
    </Box>
  );
};

export default Review;
