import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseQuery } from './settings';
import {
  getBalanceData,
  getDetailsData,
  getInventoryData,
  buyProductParams,
  getDetailsParams,
  getInventoryParams,
  Refill,
  RefillProps,
  getPriceProductParams,
  getPriceCurrencyData,
  getPriceCurrencyParams,
  IGetCode,
  activateServiceParams,
  Contact,
} from '../types/userTypes';

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['balance', 'inventory', 'details', 'price'],
  baseQuery,
  endpoints: build => ({
    getBalance: build.query<getBalanceData, void>({
      query: () => ({
        url: `profile/balance`,
        method: 'GET',
      }),
      providesTags: () => ['balance'],
    }),
    getInventory: build.query<getInventoryData, getInventoryParams>({
      query: ({ page, count }) => ({
        url: 'profile/inventory',
        method: 'GET',
        params: {
          page,
          count,
        },
      }),
      providesTags: () => ['inventory'],
    }),
    getDetails: build.query<getDetailsData, getDetailsParams>({
      query: ({ page, count, sort }) => ({
        url: `profile/details`,
        method: 'GET',
        params: {
          page,
          count,
          sort,
        },
      }),
      providesTags: () => ['details'],
    }),
    getPriceProduct: build.query<number, getPriceProductParams>({
      query: ({ id, amount }) => ({
        url: `store/price`,
        method: 'GET',
        params: {
          id,
          amount,
        },
      }),
      providesTags: () => ['price'],
    }),
    getPriceCurrency: build.query<getPriceCurrencyData, getPriceCurrencyParams>({
      query: ({ id, amount, rubs, isPack }) => ({
        url: `store/currency/`,
        method: 'GET',
        params: {
          id,
          amount,
          rubs,
          isPack,
        },
      }),
      providesTags: () => ['price'],
    }),
    buyProduct: build.mutation<{ data: any }, buyProductParams>({
      query: (body: buyProductParams) => ({
        url: `store/buy`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['balance', 'inventory', 'details'],
    }),
    refill: build.mutation<Refill, number>({
      query: amount => ({
        url: `store/refill/${amount}`,
        method: 'POST',
      }),
      invalidatesTags: ['balance', 'inventory', 'details'],
    }),
    refundProduct: build.mutation<{ data: any }, string | number>({
      query: (id: string | number) => ({
        url: `/profile/refund/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['balance', 'inventory', 'details'],
    }),
    getCode: build.query<IGetCode, void>({
      query: () => ({
        url: `notification`,
        method: 'GET',
      }),
    }),
    getContactsForNotices: build.query<Contact[], void>({
      query: () => ({
        url: `contacts`,
        method: 'GET',
      }),
    }),
    activateService: build.mutation<{ data: any }, activateServiceParams>({
      query: ({ id, serverId }) => ({
        url: `/profile/updateServer/`,
        params: {
          id,
          serverId,
        },
        method: 'PUT',
      }),
      invalidatesTags: ['balance', 'inventory', 'details'],
    }),
  }),
});
