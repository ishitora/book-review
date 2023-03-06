import React from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { RatingDisplay } from '@/components/Ratings/Rating';
import type { TReview } from '@/types/review';

const Review = ({ review }: { review: TReview }) => {
  return (
    <Box sx={{ borderBottom: '2px solid #ddd', padding: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt="user icon"
            src={review.user.avatar}
            sx={{ marginRight: '12px' }}
          ></Avatar>

          <Typography variant="h6" sx={{ color: 'primary.main' }}>
            {review.user.name}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: '#888' }}>
          {review.create_date}
        </Typography>
      </Box>

      <RatingDisplay rating={review.rating} />
      <Box sx={{ padding: '12px 0' }}>
        <Typography variant="h6" sx={{ color: 'primary.main' }}>
          {review.title}
        </Typography>
        <Typography
          sx={{
            whiteSpace: 'pre-line',
          }}
        >
          {review.content}
        </Typography>
      </Box>
    </Box>
  );
};

export default Review;
