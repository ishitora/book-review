import type { Ratings } from '../types';

//可傳入評分或評分陣列，回傳評分或平均評分
export const calculateAverageRating = (rating: number | Ratings): number => {
  if (typeof rating === 'number') {
    return rating;
  }

  if (!rating?.length) {
    return 0;
  }
  return rating.reduce((pre, cur) => pre + cur.rating, 0) / rating.length;
};

export const calculateRatingsCounts = (
  rating: Ratings
): { total: number; ratings: [number, number, number, number, number] } => {
  return {
    ratings: rating.reduce(
      (pre, cur) => {
        pre[5 - cur.rating] += 1;
        return pre;
      },
      [0, 0, 0, 0, 0]
    ),
    total: rating.length,
  };
};
