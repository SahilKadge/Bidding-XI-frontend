// src/types/auth.ts
export interface User {
  _id: string;
  fullname: string;
  email: string;
  role: string;
  teamName?: string;
  isVerified?: boolean;
  accessToken?: string;
  refreshToken?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  fullname: string;
  email: string;
  password: string;
  role: string;
  teamName?: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface VerifyOtpFormData {
  email: string;
  otp: string;
}

export interface ChangePasswordFormData {
  email: string;
  password: string;
  confirmPassword: string;
}