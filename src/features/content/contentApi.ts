import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Post } from '@/types/admin'

export const contentApi = createApi({
  reducerPath: 'contentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/admin/',
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], any>({
      query: (params) => ({ url: 'content', params }),
      providesTags: ['Post'],
    }),
    getPostById: builder.query<Post, string>({
      query: (id) => `content/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Post', id }],
    }),
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({ url: 'content', method: 'POST', body }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation<Post, Partial<Post> & { id?: string }>({
      query: ({ id, ...body }) => ({ url: id ? `content/${id}` : 'content', method: 'PATCH', body }),
      invalidatesTags: (_result, _err, { id }) => id ? [{ type: 'Post', id }] : ['Post'],
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({ url: `content/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Post'],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = contentApi
