import { apiSlice } from './apiSlice';

export const leadsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLeads: builder.query<any, void>({
      query: () => '/leads',
      providesTags: ['Lead'],
    }),
  }),
});

export const { useGetAllLeadsQuery } = leadsApi;
