type LogInRequest = {
  emailOrUsername: string;
  password: string;
};

type LogInResponse = User;

type EmailVerificationRequest = {
  code: string;
};

type EmailVerificationResponse = {
  success: boolean;
};

type ForgotPasswordRequest = {
  email: string;
};

type ForgotPasswordResponse = {
  message: string;
};

type ResetPasswordRequest = {
  token: string;
  password: string;
};

type ResetPasswordResponse = {
  message: string;
};
