import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "./settings";
import { user } from "../types/userTypes";

export const chatApi = createApi({
  reducerPath: "chatApi",
  tagTypes: ["groups", "message"],
  baseQuery,
  endpoints: (build) => ({
    getGroups: build.query<any, void>({
      query: () => ({
        url: `/chat/groups`,
        method: "GET",
      }),
      providesTags: () => ["groups"],
    }),
    requestChat: build.mutation<
      any,
      {
        userId: number;
      }
    >({
      query: (body) => ({
        url: `/chat/request`,
        method: "POST",
        body: body,
      }),
    }),
    getMessages: build.query<any, number | string>({
      query: (groupId) => ({
        url: `  /api/chat/${groupId}`,
        method: "GET",
      }),
      providesTags: () => ["message"],
    }),
  }),
});
