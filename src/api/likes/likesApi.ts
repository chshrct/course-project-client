import { appApi } from '../appApi';

import {
  CreateLikeRequestType,
  DeleteLikeRequestType,
  DeleteLikeResponseType,
  GetItemLikesRequestType,
  GetItemLikesResponseType,
  LikeType,
} from './types';

export const likesApi = appApi.injectEndpoints({
  endpoints: builder => ({
    getItemLikes: builder.query<GetItemLikesResponseType, GetItemLikesRequestType>({
      query: ({ id }) => ({
        url: `/likes/${id}`,
      }),
    }),
    createLike: builder.mutation<LikeType, CreateLikeRequestType>({
      query: body => ({
        url: '/likes',
        method: 'POST',
        body,
      }),
      onQueryStarted({ item, user }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          likesApi.util.updateQueryData('getItemLikes', { id: item }, draft => {
            draft.users.push(user);
          }),
        );

        queryFulfilled.catch(patch.undo);
      },
    }),
    deteleLike: builder.mutation<DeleteLikeResponseType, DeleteLikeRequestType>({
      query: body => ({
        url: '/likes',
        method: 'DELETE',
        body,
      }),
      onQueryStarted({ item, user }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          likesApi.util.updateQueryData('getItemLikes', { id: item }, draft => {
            draft.users = draft.users.filter(userId => userId !== user);
          }),
        );

        queryFulfilled.catch(patch.undo);
      },
    }),
  }),
});

export const { useGetItemLikesQuery, useCreateLikeMutation, useDeteleLikeMutation } =
  likesApi;
