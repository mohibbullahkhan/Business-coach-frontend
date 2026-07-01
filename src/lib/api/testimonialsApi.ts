import { apiSlice } from './apiSlice'
import { ApiResponse } from '@/types/api'
import { Testimonial } from '@/types/admin'

export const testimonialsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminTestimonials: builder.query<ApiResponse<Testimonial[]>, { visible?: boolean } | void>({
      query: (params) => ({
        url: '/testimonials',
        params: params || undefined,
      }),
      providesTags: ['Testimonial'],
    }),
    createTestimonial: builder.mutation<ApiResponse<Testimonial>, { data: any; avatar?: File }>({
      query: ({ data, avatar }) => {
        const formData = new FormData()
        Object.keys(data).forEach((key) => {
          if (data[key] !== undefined) {
            formData.append(key, data[key])
          }
        })
        if (avatar) {
          formData.append('avatar', avatar)
        }
        return {
          url: '/testimonials',
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: ['Testimonial'],
    }),
    updateTestimonial: builder.mutation<ApiResponse<Testimonial>, { id: string; data: any; avatar?: File }>({
      query: ({ id, data, avatar }) => {
        const formData = new FormData()
        Object.keys(data).forEach((key) => {
          if (data[key] !== undefined) {
            formData.append(key, data[key])
          }
        })
        if (avatar) {
          formData.append('avatar', avatar)
        }
        return {
          url: `/testimonials/${id}`,
          method: 'PUT',
          body: formData,
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Testimonial', id }, 'Testimonial'],
    }),
    toggleTestimonialVisibility: builder.mutation<ApiResponse<Testimonial>, string>({
      query: (id) => ({
        url: `/testimonials/${id}/toggle`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Testimonial', id }, 'Testimonial'],
    }),
    deleteTestimonial: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/testimonials/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Testimonial'],
    }),
  }),
})

export const {
  useGetAdminTestimonialsQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useToggleTestimonialVisibilityMutation,
  useDeleteTestimonialMutation,
} = testimonialsApi
