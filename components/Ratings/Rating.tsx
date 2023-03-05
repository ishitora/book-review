import React from 'react';

import { useFormContext } from 'react-hook-form';
import { MdStarOutline, MdOutlineStar, MdStarHalf } from 'react-icons/md';
import ErrorMessage from '@/components/common/ErrorMessage';
import { calculateAverageRating } from './utils/index';
import type { TRating } from './types';
import Box from '@mui/material/Box';

type Props = { name: string; errorMessage?: string | undefined };
const scoreArr = [
  { score: 1, text: '差勁' },
  { score: 2, text: '微妙' },
  { score: 3, text: '普通' },
  { score: 4, text: '不錯' },
  { score: 5, text: '優秀' },
];

const Rating = ({ name, errorMessage = '' }: Props) => {
  const { setValue, watch } = useFormContext();
  const rating = watch('rating');
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            '&>svg': {
              cursor: 'pointer',
              fontSize: '24px',
            },
          }}
        >
          {scoreArr.map((starIndex, index) => {
            return rating >= starIndex.score ? (
              <MdOutlineStar
                key={index}
                color="#FFA41C"
                onClick={() => {
                  setValue(name, starIndex.score);
                }}
              />
            ) : (
              <MdStarOutline
                key={index}
                color="#aaa"
                onClick={() => {
                  setValue(name, starIndex.score);
                }}
              />
            );
          })}
        </Box>
        {rating && <span>{scoreArr[rating - 1]?.text}</span>}
      </Box>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </Box>
  );
};

export const RatingDisplay = ({
  rating,
  size = 24,
}: {
  rating: number | TRating[];
  size?: number;
}) => {
  const displayRating = calculateAverageRating(rating);

  return (
    <Box
      sx={{
        display: 'flex',
        '&>svg': {
          fontSize: `${size}px`,
        },
      }}
    >
      {scoreArr.map((starIndex) => {
        return displayRating >= starIndex.score ? (
          <MdOutlineStar color="#FFA41C" key={starIndex.score} />
        ) : starIndex.score - displayRating <= 0.5 ? (
          <MdStarHalf color="#FFA41C" key={starIndex.score} />
        ) : (
          <MdStarOutline color="#aaa" key={starIndex.score} />
        );
      })}
    </Box>
  );
};

export default Rating;
