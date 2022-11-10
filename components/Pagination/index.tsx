import React from 'react';
import { IconButton, Box, Button } from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons';

import getPaginationConfig from './utils/getPaginationConfig';

export interface PaginationConfig {
  p: number;
  count: number;
  total: number;
}
export interface PaginationProps extends PaginationConfig {
  changePage: (p: number) => void;
}

const Pagination = ({ p, count, total, changePage }: PaginationProps) => {
  const { pages, disablePre, disableNext } = getPaginationConfig({
    p,
    count,
    total,
  });

  return (
    <Box display="flex">
      <Box m="0 auto" display="flex" gap="8px">
        <IconButton
          aria-label="Search database"
          icon={<ArrowLeftIcon />}
          disabled={disablePre}
          onClick={() => {
            changePage(1);
          }}
        />
        <IconButton
          aria-label="Search database"
          icon={<ChevronLeftIcon h={7} w={7} />}
          disabled={disablePre}
          onClick={() => {
            changePage(p - 1);
          }}
        />

        {pages.map((page) => (
          <Button
            key={page}
            colorScheme={page === Number(p) ? 'blue' : 'gray'}
            onClick={() => {
              changePage(page);
            }}
          >
            {page}
          </Button>
        ))}

        <IconButton
          aria-label="Search database"
          icon={<ChevronRightIcon h={7} w={7} />}
          disabled={disableNext}
          onClick={() => {
            changePage(p + 1);
          }}
        />
        <IconButton
          aria-label="Search database"
          icon={<ArrowRightIcon />}
          disabled={disableNext}
          onClick={() => {
            changePage(Math.ceil(total / count));
          }}
        />
      </Box>
    </Box>
  );
};

export default Pagination;
