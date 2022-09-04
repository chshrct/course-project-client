import { io } from 'socket.io-client';

import { appApi } from '../appApi';

import { CommentResponseType, CreateCommentRequestType } from './types';

export const commentsApi = appApi.injectEndpoints({
  endpoints: builder => ({
    getComments: builder.query<CommentResponseType[], { id: string }>({
      query: ({ id }) => ({
        url: `/comments/${id}`,
      }),
      async onCacheEntryAdded(
        { id },
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded;
          const socket = io(process.env.REACT_APP_BASE_SERVER_URL!, {
            path: `/socket`,
          });

          socket.on('connect', () => {
            socket.emit('itemId', id);
            socket.on('newComment', (comment: CommentResponseType) => {
              updateCachedData(draft => {
                draft.push(comment);
              });
            });
          });
          await cacheEntryRemoved;
          socket.disconnect();
        } catch (e) {
          console.log(e);
        }
      },
    }),
    createComment: builder.mutation<CommentResponseType, CreateCommentRequestType>({
      query: body => ({
        url: '/comments',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateCommentMutation, useGetCommentsQuery } = commentsApi;
