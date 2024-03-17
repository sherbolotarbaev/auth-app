import { cookies } from 'next/headers';

import axios from '@/app/redux/api/axios';

export async function getMe(_req: GetMeRequest): Promise<User | 401 | undefined> {
  if (!cookies().get('session')) return;

  try {
    const response = await axios.get('/me');
    return response.data;
  } catch (error: any) {
    cookies().delete('session-middleware');
    return 401;
  }
}
