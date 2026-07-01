import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '@/types/api'
import { Post, Testimonial, Lead, Booking } from '@/types/admin'

export const publicApi = createApi({
  reducerPath: 'publicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: (process.env.NEXT_PUBLIC_API_URL || 'https://business-coach-backend.vercel.app/api') + '/public',
  }),
  tagTypes: ['PublicPost', 'PublicTestimonial'],
  endpoints: (builder) => ({
    getPublicPosts: builder.query<ApiResponse<Post[]>, void>({
      query: () => '/content',
      providesTags: ['PublicPost'],
    }),
    getPublicPostBySlug: builder.query<ApiResponse<Post>, string>({
      query: (slug) => `/content/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'PublicPost', id: slug }],
    }),
    getPublicTestimonials: builder.query<ApiResponse<Testimonial[]>, void>({
      query: () => '/testimonials',
      providesTags: ['PublicTestimonial'],
    }),
    submitPublicLead: builder.mutation<ApiResponse<Lead>, Partial<Lead>>({
      query: (body) => ({
        url: '/leads',
        method: 'POST',
        body, // Note: Do not include stage or source in UI payload
      }),
    }),
    submitPublicBooking: builder.mutation<ApiResponse<Booking>, Partial<Booking>>({
      query: (body) => ({
        url: '/bookings',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetPublicPostsQuery,
  useGetPublicPostBySlugQuery,
  useGetPublicTestimonialsQuery,
  useSubmitPublicLeadMutation,
  useSubmitPublicBookingMutation,
} = publicApi
