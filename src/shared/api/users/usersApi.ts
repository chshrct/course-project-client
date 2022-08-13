/* eslint-disable no-param-reassign */
import { appApi } from '../appApi';

import {
  DeleteUsersRequestBodyType,
  GetAllUsersRequestQueryType,
  GetAllUsersResponseBodyType,
  UpdateUsersAccessRequestBodyType,
  UpdateUsersAccessResponseBodyType,
  UpdateUsersStatusRequestBodyType,
  UpdateUsersStatusResponseBodyType,
} from './types';

export const usersApi = appApi.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<GetAllUsersResponseBodyType, GetAllUsersRequestQueryType>({
      query: params => ({
        url: '/user',
        params,
      }),
      providesTags: ['USERS'],
    }),
    updateUsersStatus: builder.mutation<
      UpdateUsersStatusResponseBodyType,
      UpdateUsersStatusRequestBodyType
    >({
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
          usersApi.util.updateQueryData('getUsers', { limit, page }, draft => {
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
    updateUsersAccess: builder.mutation<
      UpdateUsersAccessResponseBodyType,
      UpdateUsersAccessRequestBodyType
    >({
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
          usersApi.util.updateQueryData('getUsers', { limit, page }, draft => {
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
          usersApi.util.updateQueryData('getUsers', { limit, page }, draft => {
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
  useGetUsersQuery,
  useUpdateUsersStatusMutation,
  useUpdateUsersAccessMutation,
  useDeleteUsersMutation,
} = usersApi;
