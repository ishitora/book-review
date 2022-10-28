import type { Props } from '../index';

const getPaginationConfig = ({ p, count, total }: Props) => {
  if (p === 0 || total === 0) {
    return {
      pages: [1],
      disablePre: false,
      disableNext: false,
    };
  }

  const lastPage = Math.ceil(total / count);
  const pages = [p];
  for (let i = 1; i < 7; i++) {
    if (pages.length === 7) {
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
