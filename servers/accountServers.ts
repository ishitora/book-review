import API from './API';

const signup = (payload) => {
  return API.post('api/account/signup', payload).then((res) => res.data);
};

const login = (payload) => {
  return API.post('api/account/login', payload).then((res) => res.data);
};

const getAccount = () => {
  return API.get('api/account').then((res) => res.data);
};

const accountServers = { signup, login, getAccount };
export default accountServers;
