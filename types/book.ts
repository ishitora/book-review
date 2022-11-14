import type { Ratings } from '@/components/Ratings/types';

export type TBook = {
  id: string;
  title: string;
  image: string;
  authors: string[];
  textSnippet: string;
  ratings: Ratings;
};

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
  ratings: Ratings;
};

export type BookStatus = 0 | 1 | 2;
