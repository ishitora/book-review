import type { TRating } from '@/components/Ratings/types';

export type TBookDetail = {
  id: string;
  title: string;
  image: string;
  authors: string[];
  categories: string[];
  publisher: string;
  ISBN?: string;
  publishedDate?: string;
  description: string;
  price?: number;
  pageCount?: number;
  ratings: TRating[];
};

export type BookStatus = 0 | 1 | 2;

export type TSearchBook = Pick<
  TBookDetail,
  'id' | 'image' | 'ratings' | 'title' | 'authors'
> & {
  textSnippet: string;
};

export type TMyBook = {
  book: Pick<TBookDetail, 'id' | 'image' | 'ratings' | 'title'>;
  status: BookStatus;
};
