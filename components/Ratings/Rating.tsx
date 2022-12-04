import React, { useState, useRef } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { MdStarOutline, MdOutlineStar, MdStarHalf } from 'react-icons/md';
import ErrorMessage from '@/components/common/ErrorMessage';
import { calculateAverageRating } from './utils/index';

import type { Ratings } from './types';

type Props = { name: string; errorMessage?: string | undefined };
const scoreArr = [
  { score: 1, text: '差勁' },
  { score: 2, text: '微妙' },
  { score: 3, text: '普通' },
  { score: 4, text: '不錯' },
  { score: 5, text: '優秀' },
];

const Rating = ({ name, errorMessage = '' }: Props) => {
  const [hoverStar, setHoverStar] = useState<number | null>(null);
  const clearWhenLeave = useRef(true);

  const { setValue, getValues } = useFormContext();

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
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
          onMouseLeave={() => {
            setHoverStar(null);
            if (clearWhenLeave.current === false) {
              clearWhenLeave.current = true;
            } else {
              setValue(name, null);
            }
          }}
        >
          {scoreArr.map((starIndex) => {
            return (getValues(name) >= starIndex.score && !hoverStar) ||
              (typeof hoverStar === 'number' &&
                hoverStar >= starIndex.score) ? (
              <MdOutlineStar
                color="#FFA41C"
                onMouseEnter={() => {
                  setHoverStar(starIndex.score);
                }}
                onClick={() => {
                  clearWhenLeave.current = false;
                  setValue(name, starIndex.score);
                }}
              />
            ) : (
              <MdStarOutline
                color="#aaa"
                onMouseEnter={() => {
                  setHoverStar(starIndex.score);
                }}
              />
            );
          })}
        </Box>
        {(getValues(name) || hoverStar) && (
          <span>{scoreArr[(hoverStar || getValues(name)) - 1]?.text}</span>
        )}
      </Box>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </Box>
  );
};

export const RatingDisplay = ({
  rating,
  size = 24,
}: {
  rating: number | Ratings;
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
