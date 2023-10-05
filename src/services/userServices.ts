import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "./settings";
import { user } from "../types/userTypes";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["user"],
  baseQuery,
  endpoints: (build) => ({
    getUser: build.query<{ user: user }, string>({
      query: (id) => ({
        url: `/user/${id}`,
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
  }),
});
