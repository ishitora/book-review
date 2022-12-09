export type TReview = {
  id: string;
  user: { name: string };
  title: string;
  rating: number;
  content: string;
  likes: number;
};

export type MyReview = {
  create_time: string;
  title: string;
  rating: number;
  content: string;
  likes: number;
  id: string;
  reference: string;
};
