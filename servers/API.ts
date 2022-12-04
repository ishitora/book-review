import axios from 'axios';
const API = axios.create({
  timeout: 10000,
});

export default API;

export const fetcher = (url: string) => API.get(url).then((res) => res.data);
