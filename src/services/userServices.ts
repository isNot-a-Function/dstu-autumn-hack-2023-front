import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "./settings";
import { user } from "../types/userTypes";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["user"],
  baseQuery,
  endpoints: (build) => ({
    getUser: build.query<{ user: user }, void>({
      query: () => ({
        url: `/user/`,
        method: "GET",
      }),
      providesTags: () => ["user"],
    }),
    changePhoto: build.mutation<any, any>({
      query: (body) => ({
        url: `/user/logo`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => ["user"],
    }),
    changeRole: build.mutation<any, void>({
      query: () => ({
        url: `/user/change`,
        method: "POST",
      }),
      invalidatesTags: () => ["user"],
    }),
    addBalance: build.mutation<
      any,
      {
        sum: number;
      }
    >({
      query: (body) => ({
        url: `/balance/topup`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => ["user"],
    }),
    decreaseBalance: build.mutation<
      any,
      {
        sum: number;
      }
    >({
      query: (body) => ({
        url: `/balance/decrease`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => ["user"],
    }),
    getHistoryBalance: build.query<any, { page: number }>({
      query: ({ page }) => ({
        url: `/user/balance?page=${page}`,
        method: "GET",
      }),
      providesTags: () => ["user"],
    }),
  }),
});
