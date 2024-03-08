import { api as index } from '..';

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<GetMeResponse, GetMeRequest>({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
      providesTags: ['me'],
    }),
  }),
});
export const { useGetMeQuery } = api;
export default api;
