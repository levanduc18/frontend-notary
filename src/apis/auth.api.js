import httpClient from './httpClient';
import { AUTH_ENDPOINT } from '@/helpers/constants';

const register = (data) => {
  return httpClient.post(`${AUTH_ENDPOINT}/register`, data);
};
const login = (data) => {
  return httpClient.post(`${AUTH_ENDPOINT}/login`, data);
};

export default { register, login };
