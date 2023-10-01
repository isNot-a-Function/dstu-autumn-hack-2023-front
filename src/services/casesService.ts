import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./settings";
import { getSpecializationsData } from "../types/casesTypes";

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
  }),
});
