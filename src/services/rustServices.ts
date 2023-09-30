import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './settings';
import {
  monitoringServers,
  getBanListItem,
  getBanListParams,
  getShopItem,
  serversServer,
  getTypeServersData,
} from '../types/rustTypes';
import { getLeaders, getLeadersItem } from '../types/userTypes';

interface getLeadersParams {
  count: number;
  page: number;
  id: number | undefined;
}

export const rustApi = createApi({
  reducerPath: 'rustApi',
  baseQuery,
  tagTypes: ['banList', 'shop', 'leaders'],
  endpoints: build => ({
    getServers: build.query<monitoringServers, void>({
      query: () => ({
        url: `servers`,
        method: 'GET',
      }),
    }),
    getBanList: build.query<{ banlist: getBanListItem[]; pages: number }, getBanListParams>({
      query: ({ page, count, searchValue }) => ({
        url: `servers/ban`,
        method: 'GET',
        params: {
          page,
          count,
          searchValue,
        },
      }),
      providesTags: () => ['banList'],
    }),
    getShop: build.query<getShopItem[], number>({
      query: id => ({
        url: `store/catalog/${id}`,
        method: 'GET',
      }),
      providesTags: () => ['shop'],
    }),
    getTypeServers: build.query<getTypeServersData[], void>({
      query: () => ({
        url: `store/types`,
        method: 'GET',
      }),
      providesTags: () => ['shop'],
    }),
    getLeaders: build.query<getLeaders, getLeadersParams>({
      query: ({ id, page, count }) => ({
        url: `servers/leaders`,
        method: 'GET',
        params: {
          page,
          count,
          id,
        },
      }),
      providesTags: () => ['leaders'],
    }),
    getLeadersTop: build.query<getLeadersItem[], number | null>({
      query: (id: number | null) => ({
        url: `servers/top/${id}`,
        method: 'GET',
      }),
      providesTags: () => ['leaders'],
    }),
    getServersByMode: build.query<serversServer[], number | null | void>({
      query: (id?: number | null) => ({
        url: `servers/server/${id ? id : ''}`,
        method: 'GET',
      }),
    }),
  }),
});
