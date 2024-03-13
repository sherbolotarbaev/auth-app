import { cookies } from 'next/headers';

import axios from '@/app/redux/api/axios';

export async function getMe(_req: GetMeRequest): Promise<User | 401 | undefined> {
  if (!cookies().get('token')) {
    cookies().delete('session-middleware');
    return;
  }

  try {
    const response = await axios({ url: '/me', method: 'GET' });
    return response.data;
  } catch (error: any) {
    return 401;
  }
}
