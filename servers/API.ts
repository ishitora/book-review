import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 30000,
});

const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.get<T>(url, config),
    delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.delete<T>(url, config),
    post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.post<T>(url, body, config),
    patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.patch<T>(url, body, config),
    put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.put<T>(url, body, config),
  };
};
const API = api(axiosInstance);

export default API;

export const fetcher = <T>(url: string) =>
  API.get<T>(url).then((res) => res.data);
