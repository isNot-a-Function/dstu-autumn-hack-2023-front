import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './settings';
import { steamLoginData } from '../types/authTypes';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: build => ({
    steamLogin: build.query<steamLoginData, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/auth/openId/${id}`,
        method: 'GET',
        credentials: 'include',
        headers: {
          signature: body,
        },
      }),
    }),
    logOut: build.query<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
      }),
    }),
  }),
});
