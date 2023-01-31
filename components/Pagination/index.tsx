import React from 'react';
import { IconButton, Box, Button, useMediaQuery } from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons';
import CustomButton from '@/components/common/CustomButton';
import getPaginationConfig from './utils/getPaginationConfig';

export interface Pagination {
  p: number;
  count: number;
  total: number;
}
export interface PaginationConfig extends Pagination {
  isMobile: boolean;
}
export interface PaginationProps extends Pagination {
  changePage: (p: number) => void;
}

const Pagination = ({ p, count, total, changePage }: PaginationProps) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)', {
    ssr: true,
    fallback: true,
  });
  const { pages, disablePre, disableNext } = getPaginationConfig({
    p,
    count,
    total,
    isMobile,
  });

  return (
    <Box display="flex">
      <Box m="0 auto" display="flex" gap="8px">
        <IconButton
          aria-label="first page"
          icon={<ArrowLeftIcon />}
          disabled={disablePre}
          onClick={() => {
            changePage(1);
          }}
        />

        {!isMobile && (
          <IconButton
            aria-label="previous page"
            icon={<ChevronLeftIcon h={7} w={7} />}
            disabled={disablePre}
            onClick={() => {
              changePage(p - 1);
            }}
          />
        )}

        {pages.map((page) => (
          <CustomButton
            key={page}
            //   colorScheme={page === Number(p) ? 'primary' : 'gray'}
            onClick={() => {
              changePage(page);
            }}
          >
            {page}
          </CustomButton>
        ))}

        {!isMobile && (
          <IconButton
            aria-label="next page"
            icon={<ChevronRightIcon h={7} w={7} />}
            disabled={disableNext}
            onClick={() => {
              changePage(p + 1);
            }}
          />
        )}
        <IconButton
          aria-label="last page"
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
