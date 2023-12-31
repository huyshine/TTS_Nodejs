import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../utitl/pause/pause";

export const blogApi = createApi({
  reducerPath: "blog",
  tagTypes: ["Comment Blog"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/",
    prepareHeaders: (headers) => {
      const token = JSON.parse(localStorage.getItem("auth")).accessToken;
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
      providesTags: ["Comment Blog"],
    }),
    getBlogDetail: builder.query<any, number | string>({
      query: (slug: number | string) => ({
        url: `blog/${slug}`,
      }),
      providesTags: ["Comment Blog"],
    }),
    addBlog: builder.mutation<any, any>({
      query: (data: any) => ({
        url: "blog/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comment Blog"],
    }),
    deleteBlog: builder.mutation<any, string | number>({
      query: (id: any) => ({
        url: `blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment Blog"],
    }),
    updateBlog: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `blog/update/${data.id}`,
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["Comment Blog"],
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
