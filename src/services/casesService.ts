import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./settings";
import { getSpecializationsData, getOrdersData } from "../types/casesTypes";

export const casesApi = createApi({
  reducerPath: "casesApi",
  baseQuery,
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
    }),
    createOrder: build.query<any, any>({
      query: (body) => ({
        url: `/order/create`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});
