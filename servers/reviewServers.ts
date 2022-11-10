import API from './API';

const getReviewsById = (id: string) => {
  return API.get(`/api/review/${id}`).then((res) => res.data);
};

const addReview = (id: string, payload) => {
  return API.post(`/api/review/${id}`, payload).then((res) => res.data);
};
const reviewServers = { getReviewsById, addReview };

export default reviewServers;
