import type { PaginationConfig } from '../index';

const getPaginationConfig = ({
  p,
  count,
  total,
  isMobile,
}: PaginationConfig) => {
  if (p === 0 || total === 0) {
    return {
      pages: [1],
      disablePre: false,
      disableNext: false,
    };
  }

  const displayCount = isMobile ? 3 : 7;

  const lastPage = Math.ceil(total / count);
  const pages = [p];
  for (let i = 1; i < displayCount; i++) {
    if (pages.length === displayCount) {
      break;
    }
    if (p - i > 0) {
      pages.push(p - i);
    }
    if (p + i <= lastPage) {
      pages.push(p + i);
    }
  }

  return {
    pages: pages.sort((a, b) => a - b),
    disablePre: p === 1,
    disableNext: p * count >= total,
  };
};

export default getPaginationConfig;
