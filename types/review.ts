export type TReview = {
  id: string;
  user: { name: string };
  title: string;
  rating: number;
  content: string;
  likes: number;
};
