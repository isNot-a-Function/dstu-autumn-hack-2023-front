import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './settings';
import { getCustomPagesData, getSettingsData, getCustomPageData } from '../types/customPageTypes';

export const customPageApi = createApi({
  reducerPath: 'customPageApi',
  baseQuery,
  endpoints: build => ({
    getSettings: build.query<getSettingsData, void>({
      query: () => ({
        url: `store/base`,
        method: 'GET',
      }),
    }),
    getCustomPages: build.query<getCustomPagesData[], void>({
      query: () => ({
        url: `page`,
        method: 'GET',
      }),
    }),
    getCustomPage: build.query<getCustomPageData, number>({
      query: (id: number) => ({
        url: `page/custom/${id}`,
        method: 'GET',
      }),
    }),
  }),
});
