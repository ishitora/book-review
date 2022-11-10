import API from './API';
import { TBookDetail } from '@/types/book';

const getBookData = (id: string) => {
  return API.get<TBookDetail>(`/api/book/${id}`).then((res) => res.data);
};

const bookServers = { getBookData };

export default bookServers;
