import { cookies } from 'next/headers';
import axios from 'axios';

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 30000, // 30 seconds
    withCredentials: true,
  });

  instance.interceptors.request.use(async (config) => {
    const session = cookies().get('session');

    if (session) {
      config.headers.Cookie = `session=${encodeURIComponent(session.value)}`;
    }

    return config;
  });

  return instance;
};

export default createAxiosInstance();
