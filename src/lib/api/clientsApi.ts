import { apiSlice } from './apiSlice';

export const clientsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllClients: builder.query<any, void>({
      query: () => '/clients',
      providesTags: ['Client'],
    }),
    createClient: builder.mutation<any, any>({
      query: (client) => ({
        url: '/clients',
        method: 'POST',
        body: client,
      }),
      invalidatesTags: ['Client'],
    }),
  }),
});

export const { useGetAllClientsQuery, useCreateClientMutation } = clientsApi;
