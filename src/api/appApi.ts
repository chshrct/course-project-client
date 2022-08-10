/* eslint-disable no-param-reassign */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  AuthCheckResponseBodyType,
  DeleteUsersRequestBodyType,
  GetAllUsersRequestQueryType,
  GetAllUsersResponseBodyType,
  SignInRequestBodyType,
  SignInResponseBodyType,
  SignUpRequestBodyType,
  UpdateUsersAccessRequestBodyType,
  UpdateUsersStatusRequestBodyType,
} from './types';

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
      invalidatesTags: ['USERS'],
    }),
    getUsers: builder.query<GetAllUsersResponseBodyType, GetAllUsersRequestQueryType>({
      query: params => ({
        url: '/user',
        params,
      }),
      providesTags: ['USERS'],
    }),
    updateUsersStatus: builder.mutation<void, UpdateUsersStatusRequestBodyType>({
      query: body => ({
        url: '/user/status',
        method: 'POST',
        body,
      }),
      async onQueryStarted(
        { userIds, status, limit, page },
        { dispatch, queryFulfilled },
      ) {
        dispatch(
          appApi.util.updateQueryData('getUsers', { limit, page }, draft => {
            draft.users.forEach(user => {
              if (userIds.includes(user.id)) Object.assign(user, { status });
            });
          }),
        );

        queryFulfilled.catch(() => {
          dispatch(appApi.util.invalidateTags(['USERS']));
        });
      },
    }),
    updateUsersAccess: builder.mutation<void, UpdateUsersAccessRequestBodyType>({
      query: body => ({
        url: '/user/access',
        method: 'POST',
        body,
      }),
      async onQueryStarted(
        { userIds, access, limit, page },
        { dispatch, queryFulfilled },
      ) {
        dispatch(
          appApi.util.updateQueryData('getUsers', { limit, page }, draft => {
            draft.users.forEach(user => {
              if (userIds.includes(user.id)) Object.assign(user, { access });
            });
          }),
        );

        queryFulfilled.catch(() => {
          dispatch(appApi.util.invalidateTags(['USERS']));
        });
      },
    }),
    deleteUsers: builder.mutation<void, DeleteUsersRequestBodyType>({
      query: body => ({
        url: '/user',
        method: 'DELETE',
        body,
      }),
      async onQueryStarted({ userIds, limit, page }, { dispatch, queryFulfilled }) {
        dispatch(
          appApi.util.updateQueryData('getUsers', { limit, page }, draft => {
            draft.users = draft.users.filter(user => !userIds.includes(user.id));
            draft.count -= userIds.length;
          }),
        );

        queryFulfilled.catch(() => {
          dispatch(appApi.util.invalidateTags(['USERS']));
        });
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useLazyAuthCheckQuery,
  useGetUsersQuery,
  useUpdateUsersStatusMutation,
  useUpdateUsersAccessMutation,
  useDeleteUsersMutation,
} = appApi;
