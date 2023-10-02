import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./settings";
import {
  getSpecializationsData,
  getOrdersData,
  getOrderData,
  createResponseProps,
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
    createOrder: build.mutation<any, any>({
      query: (body) => ({
        url: `/order/create`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});
