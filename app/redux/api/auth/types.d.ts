type LogInRequest = {
  emailOrUsername: string;
  password: string;
};

type LogInResponse = {
  redirectUrl: string;
};

type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type RegisterResponse = {
  redirectUrl: string;
};

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
  identificationToken: string;
  password: string;
};

type ResetPasswordResponse = {
  message: string;
};
