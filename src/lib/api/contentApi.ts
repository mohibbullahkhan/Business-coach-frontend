import { apiSlice } from './apiSlice'
import { ApiResponse } from '@/types/api'
import { Post } from '@/types/admin'

export const contentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<ApiResponse<Post[]>, { status?: string; category?: string } | void>({
      query: (params) => ({
        url: '/content',
        params: params || undefined,
      }),
      providesTags: ['Content'],
    }),
    getPostById: builder.query<ApiResponse<Post>, string>({
      query: (id) => `/content/${id}`,
      providesTags: (result, error, id) => [{ type: 'Content', id }],
    }),
    createPost: builder.mutation<ApiResponse<Post>, Partial<Post>>({
      query: (body) => ({
        url: '/content',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Content'],
    }),
    updatePost: builder.mutation<ApiResponse<Post>, { id: string; data: Partial<Post> }>({
      query: ({ id, data }) => ({
        url: `/content/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Content', id }, 'Content'],
    }),
    deletePost: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/content/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Content'],
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
