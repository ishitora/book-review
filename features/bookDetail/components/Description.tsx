import React, { useState, useEffect, useRef } from 'react';
import { Box, Button } from '@chakra-ui/react';

type Props = { description: string };

const Description = ({ description }: Props) => {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [isViewAll, setIsViewAll] = useState(false);
  const [isMoreThen4Lines, setIsMoreThen4Lines] = useState(false);

  useEffect(() => {
    const checkIsMoreThen4Lines = () => {
      setIsMoreThen4Lines(
        descriptionRef.current && descriptionRef.current?.offsetHeight > 100
          ? true
          : false
      );
    };

    checkIsMoreThen4Lines();
    window.addEventListener('resize', checkIsMoreThen4Lines);
    return () => {
      window.removeEventListener('resize', checkIsMoreThen4Lines);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          maxHeight: isViewAll ? descriptionRef.current?.offsetHeight : '100px',
          transition: 'max-height 0.5s',
          overflowY: 'hidden',
          position: 'relative',
          '&:after': {
            position: 'absolute',
            bottom: 0,
            height: '100%',
            width: '100%',
            content: '""',
            background:
              isMoreThen4Lines &&
              !isViewAll &&
              'linear-gradient(to top,rgba(255,255,255, 1) 0%,rgba(255,255,255, 0) 40%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Box
          ref={descriptionRef}
          sx={{
            fontSize: '1rem',
            wordBreak: 'break-all',
            whiteSpace: 'pre-line',
          }}
        >
          {description}
        </Box>
      </Box>
      {!isViewAll && isMoreThen4Lines && (
        <Button
          variant="link"
          onClick={() => {
            setIsViewAll(true);
          }}
        >
          查看全部
        </Button>
      )}
    </>
  );
};

export default Description;
