import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jsonPlaceholderApi = createApi({
  reducerPath: "jsonPlaceholderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<{ id: number; title: string }[], void>({
      query: () => "posts"
    }),
    createPosts: builder.mutation<
      { id: number; title: string }[], // response type
      Partial<{ title: string }> // argument type
    >({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostsMutation } = jsonPlaceholderApi;
