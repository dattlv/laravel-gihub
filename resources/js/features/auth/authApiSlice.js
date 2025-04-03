import { apiSlice } from '../../services/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: route('login'),
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    verifyAccount: builder.mutation({
      query: credentials => ({
        url: route('api.auth.verify-account'),
        method: 'POST',
        body: credentials,
      }),
    }),
    getUser: builder.query({
      query: () => route('api.auth.user'),
      providesTags: ['Auth'],
    }),
  }),
});
