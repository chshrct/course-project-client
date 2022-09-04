import { appApi } from '../appApi';

import {
  AuthCheckResponseBodyType,
  GithubSignInRequestType,
  SignInRequestBodyType,
  SignInResponseBodyType,
  SignUpRequestBodyType,
} from './types';

export const authApi = appApi.injectEndpoints({
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
    githubSignIn: builder.mutation<SignInResponseBodyType, GithubSignInRequestType>({
      query: body => ({
        url: 'auth/github',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useLazyAuthCheckQuery,
  useGithubSignInMutation,
} = authApi;
