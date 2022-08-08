import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  AuthCheckResponseBodyType,
  SignInRequestBodyType,
  SignInResponseBodyType,
  SignUpRequestBodyType,
} from './types';
import { UserType } from './types/users';

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
  endpoints: builder => ({
    authCheck: builder.query<AuthCheckResponseBodyType, void>({
      query: () => ({
        url: '/auth/check',
      }),
    }),
    signUp: builder.mutation<void, SignUpRequestBodyType>({
      query: body => ({
        url: '/auth/sign-up',
        method: 'POST',
        body,
      }),
    }),
    signIn: builder.mutation<SignInResponseBodyType, SignInRequestBodyType>({
      query: body => ({
        url: '/auth/sign-in',
        method: 'POST',
        body,
      }),
    }),
    getUsers: builder.query<UserType[], void>({
      query: () => ({
        url: '/user/all',
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useLazyAuthCheckQuery,
  useGetUsersQuery,
} = appApi;
