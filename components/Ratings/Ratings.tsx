import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import type { Ratings } from './types';
import { calculateRatingsCounts, calculateAverageRating } from './utils/index';
import { RatingDisplay } from './Rating';

const RatingHistogram = ({
  star,
  ratingCount,
  total,
}: {
  star: number;
  ratingCount: number;
  total: number;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        '&:not(:first-child)': {
          marginTop: '12px',
        },
      }}
    >
      <Box
        sx={{
          width: '40px',
        }}
      >
        <Text>{`${star}星:`}</Text>
      </Box>
      <Box
        sx={{
          margin: '0 12px',
          backgroundColor: '#eee',
          width: '300px',
          height: '30px',
          borderRadius: '15px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#FFA41C',
            position: 'absolute',
            height: '30px',
            left: 0,
            borderRadius: '15px',
            width: total ? `${(ratingCount / total) * 100}%` : 0,
          }}
        ></Box>
      </Box>
      {total > 0 && (
        <Text>{`${Math.round((ratingCount / total) * 100)}%`}</Text>
      )}
    </Box>
  );
};

const Ratings = ({ ratings = [] }: { ratings: Ratings }) => {
  const ratingsCounts = calculateRatingsCounts(ratings);
  const averageRating = calculateAverageRating(ratings);

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <RatingDisplay rating={ratings} size={36} />
        <Text fontSize="20px">
          {ratings.length > 0 ? `${averageRating.toFixed(1)}分` : '尚無評分'}
        </Text>
      </Box>
      <Text fontSize="20px">{ratingsCounts.total}個評分</Text>

      {ratingsCounts.ratings.map((ratingCount, index) => (
        <RatingHistogram
          key={5 - index}
          star={5 - index}
          ratingCount={ratingCount}
          total={ratingsCounts.total}
        />
      ))}
    </div>
  );
};

export default Ratings;
