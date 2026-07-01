import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Testimonial } from '@/types/admin'

export const testimonialsApi = createApi({
  reducerPath: 'testimonialsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/admin/',
  }),
  tagTypes: ['Testimonial'],
  endpoints: (builder) => ({
    getTestimonials: builder.query<Testimonial[], any>({
      query: (params) => ({ url: 'testimonials', params }),
      providesTags: ['Testimonial'],
    }),
    getTestimonialById: builder.query<Testimonial, string>({
      query: (id) => `testimonials/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Testimonial', id }],
    }),
    createTestimonial: builder.mutation<Testimonial, Partial<Testimonial>>({
      query: (body) => ({ url: 'testimonials', method: 'POST', body }),
      invalidatesTags: ['Testimonial'],
    }),
    updateTestimonial: builder.mutation<Testimonial, Partial<Testimonial> & { id?: string }>({
      query: ({ id, ...body }) => ({ url: id ? `testimonials/${id}` : 'testimonials', method: 'PATCH', body }),
      invalidatesTags: (_result, _err, { id }) => id ? [{ type: 'Testimonial', id }] : ['Testimonial'],
    }),
    deleteTestimonial: builder.mutation<void, string>({
      query: (id) => ({ url: `testimonials/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Testimonial'],
    }),
  }),
})

export const {
  useGetTestimonialsQuery,
  useGetTestimonialByIdQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
} = testimonialsApi
