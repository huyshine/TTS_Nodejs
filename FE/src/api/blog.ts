import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../utitl/pause/pause";

export const blogApi = createApi({
  reducerPath: "blog",
  tagTypes: ["Blog"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
    prepareHeaders: (headers) => {
      const token = JSON.parse(localStorage.getItem("auth"))?.access_token      ;
      headers.set("authorization", `Bearer ${token}`);
      // modify header theo từng request
      return headers;
    },
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints: (builder) => ({
    getblog: builder.query<any, void>({
      query: () => `blog`,
      providesTags: ["Blog"],
    }),
    getBlogDetail: builder.query<any, number | string>({
      query: (id: number | string) => ({
        url: `blog/${id}`,
      }),
      providesTags: ["Blog"],
    }),
    addBlog: builder.mutation<any, any>({
      query: (data: any) => ({
        url: "blog/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),
    deleteBlog: builder.mutation<any, string | number>({
      query: (id: any) => ({
        url: `blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `blog/${data.id}`,
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetblogQuery,
  useGetBlogDetailQuery,
  useAddBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogApi;
