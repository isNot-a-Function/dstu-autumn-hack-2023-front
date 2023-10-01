import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./settings";
import { steamLoginData, ISignUpUser, ISignInUser } from "../types/authTypes";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (build) => ({
    signUp: build.query<steamLoginData, ISignUpUser>({
      query: (body: ISignUpUser) => ({
        url: `/auth/signup`,
        method: "POST",
        credentials: "include",
        body: body,
      }),
    }),
    signIn: build.query<steamLoginData, ISignInUser>({
      query: (body: ISignUpUser) => ({
        url: `/auth/signin`,
        method: "POST",
        credentials: "include",
        body: body,
      }),
    }),
    logOut: build.query<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),
  }),
});
