import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from 'store';

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).app.userData;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['USERS'],
  endpoints: () => ({}),
});
