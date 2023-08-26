import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../utitl/pause/pause";

export const authApi = createApi({
  reducerPath: "auth",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints: (builder) => ({
    getAlluser: builder.query<any, void>({
      query: () => "/user",
      providesTags: ["User"],
    }),
    login: builder.mutation<any, any>({
      query: (data: any) => ({
        url: "/signin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation<any, any>({
      query: (data: any) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetAlluserQuery } =
  authApi;
