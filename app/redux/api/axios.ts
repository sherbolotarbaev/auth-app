import { cookies } from 'next/headers';
import axios from 'axios';

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 30000, // 30 seconds
    withCredentials: true,
  });

  instance.interceptors.request.use(async (config) => {
    const token = cookies().get('token');

    if (token) {
      config.headers.Cookie = `token=${encodeURIComponent(token.value)}`;
    } else {
      cookies().delete('session-middleware');
    }

    return config;
  });

  return instance;
};

export default createAxiosInstance();
