import API from './API';
import type { TMyBook } from '@/types/book';
interface Account {
  name: string;
  myBooks: TMyBook[];
  avatar: string;
}

interface LoginData {
  token: string;
  accountData: Account;
}

const signup = (payload: { email: string; name: string; password: string }) => {
  return API.post('/api/account/signup', payload).then((res) => res.data);
};

const login = (payload: { email: string; password: string }) => {
  return API.post<LoginData>('/api/account/login', payload).then(
    (res) => res.data
  );
};

const getAccount = () => {
  return API.get<Account>('/api/account').then((res) => res.data);
};

const accountServers = { signup, login, getAccount };

export default accountServers;
