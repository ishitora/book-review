import API from './API';
import { TBookDetail, TMyBook } from '@/types/book';

const getBookData = (id: string) => {
  return API.get<TBookDetail>(`/api/book/${id}`).then((res) => res.data);
};

const changeBookshelf = (id: string, status: 0 | 1 | 2) => {
  return API.put<TMyBook[]>(`/api/bookshelf/${id}`, { status }).then(
    (res) => res.data
  );
};

const removeBook = (id: string) => {
  return API.delete(`/api/bookshelf/${id}`).then((res) => res.data);
};

const bookServers = { getBookData, changeBookshelf, removeBook };

export default bookServers;
