import { api as index } from '..';

const api = index.injectEndpoints({
  endpoints: (build) => ({
    logIn: build.mutation<LogInResponse, LogInRequest>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['auth'],
    }),

    signup: build.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['auth'],
    }),

    emailVerification: build.mutation<
      EmailVerificationResponse,
      EmailVerificationRequest
    >({
      query: (body) => ({
        url: '/email-verification',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['auth'],
    }),

    forgotPassword: build.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (body) => ({
        url: '/password/forgot',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['auth'],
    }),

    resetPassword: build.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (body) => ({
        url: '/password/reset',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['auth'],
    }),
  }),
});

export const {
  useLogInMutation,
  useSignupMutation,
  useEmailVerificationMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = api;
export default api;
