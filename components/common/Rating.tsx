import React, { useState, useRef } from 'react';
import { Box } from '@chakra-ui/react';

import { MdStarOutline, MdOutlineStar } from 'react-icons/md';

type Props = {};
const scoreArr = [
  { score: 1, text: '差勁' },
  { score: 2, text: '微妙' },
  { score: 3, text: '普通' },
  { score: 4, text: '不錯' },
  { score: 5, text: '優秀' },
];

const Rating = (props: Props) => {
  const [score, setScore] = useState(null);
  const [hoverStar, setHoverStar] = useState(null);
  const clearWhenLeave = useRef(true);
  return (
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
            setScore(null);
          }
        }}
      >
        {scoreArr.map((starIndex) => {
          return (score >= starIndex.score && !hoverStar) ||
            hoverStar >= starIndex.score ? (
            <MdOutlineStar
              color="#fdd835"
              onMouseEnter={() => {
                setHoverStar(starIndex.score);
              }}
              onClick={() => {
                clearWhenLeave.current = false;
                setScore(starIndex.score);
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
      {(score || hoverStar) && (
        <span>{scoreArr[(hoverStar || score) - 1]?.text}</span>
      )}
    </Box>
  );
};

export default Rating;
