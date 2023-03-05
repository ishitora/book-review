export type TReview = {
  id: string;
  user: { name: string; avatar?: string };
  title: string;
  rating: number;
  content: string;
  likes: number;
};

export type MyReview = {
  create_date: string;
  title: string;
  rating: number;
  content: string;
  likes: number;
  id: string;
  reference: string;
};
