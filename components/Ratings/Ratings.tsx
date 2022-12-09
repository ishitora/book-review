import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import type { TRating } from './types';
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
        '&:not(:first-of-type)': {
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
          flex: 1,
          margin: '0 12px',
          backgroundColor: '#eee',
          maxWidth: '300px',
          height: '20px',
          borderRadius: '15px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#FFA41C',
            position: 'absolute',
            height: '20px',
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

const Ratings = ({ ratings = [] }: { ratings: TRating[] }) => {
  const ratingsCounts = calculateRatingsCounts(ratings);
  const averageRating = calculateAverageRating(ratings);

  return (
    <Box>
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
    </Box>
  );
};

export default Ratings;
