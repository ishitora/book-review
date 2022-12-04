import axios from 'axios';

const API = axios.create({
  baseURL: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  timeout: 10000,
});

export default API;

export const fetcher = (url: string) => API.get(url).then((res) => res.data);
