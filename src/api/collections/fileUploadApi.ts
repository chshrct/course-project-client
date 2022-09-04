import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fileUploadApi = createApi({
  reducerPath: 'fileUploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_CLOUD_URL,
  }),
  endpoints: builder => ({
    uploadImage: builder.mutation<any, FormData>({
      query: body => ({
        url: 'upload',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = fileUploadApi;
