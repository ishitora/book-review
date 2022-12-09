import API from './API';

import type { TReview, MyReview } from '@/types/review';

const getReviewsById = (id: string) => {
  return API.get<TReview[]>(`/api/review/${id}`).then((res) => res.data);
};

const getMyReviews = () => {
  return API.get<MyReview[]>('/api/review').then((res) => res.data);
};

const addReview = (id: string, payload) => {
  return API.post<MyReview>(`/api/review/${id}`, payload).then(
    (res) => res.data
  );
};
const reviewServers = { getReviewsById, addReview, getMyReviews };

export default reviewServers;
