import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import getPaginationConfig from './utils/getPaginationConfig';

const PaginationButton = styled(Button)({
  minWidth: '0px',
  fontSize: '14px',
  padding: '4px 12px',
  border: '1px solid #ccc',
  backgroundColor: 'transparent',
  color: '#888',
  borderRadius: 0,
  '&:hover': {
    backgroundColor: '#eee',
  },
  '&:disabled': {
    color: '#fff',
    cursor: 'not-allowed',
  },
});

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
  const isMobile = useMediaQuery('(max-width: 768px)', { noSsr: true });
  const { pages, disablePre, disableNext } = getPaginationConfig({
    p,
    count,
    total,
    isMobile,
  });

  return (
    <Box display="flex">
      <Box m="0 auto" display="flex">
        <PaginationButton
          aria-label="first page"
          disabled={disablePre}
          onClick={() => {
            changePage(1);
          }}
        >
          <KeyboardDoubleArrowLeftIcon />
        </PaginationButton>

        {!isMobile && (
          <PaginationButton
            aria-label="previous page"
            disabled={disablePre}
            onClick={() => {
              changePage(p - 1);
            }}
          >
            <ChevronLeftIcon />
          </PaginationButton>
        )}

        {pages.map((page) => (
          <PaginationButton
            key={page}
            //   colorScheme={page === Number(p) ? 'primary' : 'gray'}
            sx={
              page === Number(p)
                ? {
                    backgroundColor: '#888',
                    borderColor: '#888',
                    color: '#fff',
                  }
                : {}
            }
            disabled={page === Number(p) ? true : false}
            onClick={() => {
              changePage(page);
            }}
          >
            {page}
          </PaginationButton>
        ))}

        {!isMobile && (
          <PaginationButton
            aria-label="next page"
            disabled={disableNext}
            onClick={() => {
              changePage(p + 1);
            }}
          >
            <ChevronRightIcon />
          </PaginationButton>
        )}
        <PaginationButton
          aria-label="last page"
          disabled={disableNext}
          onClick={() => {
            changePage(Math.ceil(total / count));
          }}
        >
          <KeyboardDoubleArrowRightIcon />
        </PaginationButton>
      </Box>
    </Box>
  );
};

export default Pagination;
