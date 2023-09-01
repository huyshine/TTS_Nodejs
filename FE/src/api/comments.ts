import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../utitl/pause/pause";

export const commentApi = createApi({
  reducerPath: "comments",
  tagTypes: ["Comment"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers) => {
      const token = JSON.parse(localStorage.getItem("auth"))?.access_token;
      headers.set("authorization", `Bearer ${token}`);
      // modify header theo từng request
      return headers;
    },
    // fetchFn: async (...args) => {
    //   await pause(1000);
    //   return fetch(...args);
    // },
  }),
  endpoints: (builder) => ({
    getAllCmt: builder.query<any, void>({
      query: () => "/comment",
      providesTags: ["Comment"],
    }),
    getCmtByPost: builder.query<any, number | string>({
      query: (id: any) => `/comment/byBlog/${id}`,
      providesTags: ["Comment"],
    }),
    addComment: builder.mutation<any, any>({
      query: (data: any) => ({
        url: "/comment/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comment"],
    }),
    removeComment: builder.mutation<any, number | string>({
      query: (id: any) => ({
        url: `/comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
    getAllTrashCmt: builder.query<any, void>({
      query: () => "/comment/trash",
      providesTags: ["Comment"],
    }),
    restoreComment: builder.mutation<any, number | string>({
      query: (id: any) => ({
        url: `/comment/restore/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Comment"],
    }),
    featuresComment: builder.mutation<any, number | string>({
      query: (id: any) => ({
        url: `/comment/features/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),

  }),
});

export const {
  useGetAllCmtQuery,
  useGetCmtByPostQuery,
  useAddCommentMutation,
  useRemoveCommentMutation,
  useGetAllTrashCmtQuery,
  useRestoreCommentMutation,
  useFeaturesCommentMutation,
} = commentApi;
