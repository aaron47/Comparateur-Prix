import { LoginRequest } from './../utils/LoginRequest';
import { BASE_LINK } from './../utils/Baselink';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthResponse } from '../utils/AuthResponse';
import { CreateUserRequest } from '../utils/CreateUserRequest';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_LINK,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<AuthResponse, CreateUserRequest>({
      query: (createUserRequest) => ({
        url: '/auth/signup',
        method: 'POST',
        body: createUserRequest,
      }),
    }),

    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (loginRequest) => ({
        url: '/auth/login',
        method: 'POST',
        body: loginRequest,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation, useLogoutMutation } =
  usersApi;
