import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "./settings";
import { user } from "../types/userTypes";

export const chatApi = createApi({
  reducerPath: "chatApi",
  tagTypes: ["user"],
  baseQuery,
  endpoints: (build) => ({
    getGroups: build.query<any, void>({
      query: () => ({
        url: `/chat/groups`,
        method: "GET",
      }),
      providesTags: () => ["user"],
    }),
  }),
});
