/* eslint-disable no-param-reassign */
import { appApi } from '../appApi';

import {
  DeleteUsersRequestBodyType,
  GetAllUsersRequestQueryType,
  GetAllUsersResponseBodyType,
  UpdateUsersRequestBodyType,
  UpdateUsersResponseBodyType,
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
    updateUsers: builder.mutation<
      UpdateUsersResponseBodyType,
      UpdateUsersRequestBodyType
    >({
      query: body => ({
        url: '/user',
        method: 'PUT',
        body,
      }),
      async onQueryStarted({ pageInfo, update, userIds }, { dispatch, queryFulfilled }) {
        const { limit, page } = pageInfo;

        dispatch(
          usersApi.util.updateQueryData('getUsers', { limit, page }, draft => {
            draft.users.forEach(user => {
              if (userIds.includes(user.id)) Object.assign(user, update);
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

export const { useGetUsersQuery, useDeleteUsersMutation, useUpdateUsersMutation } =
  usersApi;
