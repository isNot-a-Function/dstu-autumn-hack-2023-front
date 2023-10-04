import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./settings";
import {
  getSpecializationsData,
  getOrdersData,
  getOrderData,
  createResponseProps,
  archiveOrder,
} from "../types/casesTypes";

export const casesApi = createApi({
  reducerPath: "casesApi",
  baseQuery,
  tagTypes: ["orders", "order"],
  endpoints: (build) => ({
    getSpecializations: build.query<getSpecializationsData, void>({
      query: () => ({
        url: `/specialization/`,
        method: "GET",
      }),
    }),
    getOrders: build.query<{ orders: getOrdersData[]; count: number }, number>({
      query: (id) => ({
        url: `/order/?page=${id}`,
        method: "GET",
      }),
      providesTags: () => ["orders"],
    }),
    getOrder: build.query<getOrderData, string>({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      providesTags: () => ["order"],
    }),
    сreateResponse: build.mutation<getOrderData, createResponseProps>({
      query: (body) => ({
        url: `/executor/response`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => ["orders", "order"],
    }),
    archiveOrder: build.mutation<any, archiveOrder>({
      query: (body) => ({
        url: `/order/archive`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => ["orders", "order"],
    }),
    activeOrder: build.mutation<any, archiveOrder>({
      query: (body) => ({
        url: `/order/active`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => ["orders", "order"],
    }),
    createOrder: build.mutation<any, any>({
      query: (body) => ({
        url: `/order/create`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["orders"],
    }),
    checkFile: build.mutation<{ files: string[] }, any>({
      query: (body) => ({
        url: `/file/upload`,
        method: "POST",
        body: body,
      }),

      invalidatesTags: () => ["orders", "order"],
    }),
  }),
});
