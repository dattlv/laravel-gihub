import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        credentials: 'include',
        headers: {
            'X-XSRF-TOKEN': document.cookie
                .split('; ')
                .find(row => row.startsWith('XSRF-TOKEN'))
                ?.split('=')[1],
        },
    }),
    endpoints: () => ({}),
    tagTypes: ['Auth', 'User', 'Email'], // Add your tag types here
});
