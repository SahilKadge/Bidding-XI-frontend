import { API } from "./api";
import instances from "./instances";

// ---------- AUTH ----------
const register = async (payload: { fullname: string; email: string; password: string; role: string; teamName?: string }) => {
  return await instances.privateRequest.post(API.AUTH.REGISTER, payload);
};

const logIn = async (payload: { email: string; password: string }) => {
  return await instances.privateRequest.post(API.AUTH.LOGIN, payload);
};

const logOut = async () => {
  return await instances.privateRequest.post(API.AUTH.LOGOUT);
};

const checkAuth = async () => {
  return await instances.privateRequest.get(API.AUTH.CHECK_AUTH);
};

const resetPassword = async (payload: { email: string }) => {
  return await instances.privateRequest.post(API.AUTH.RESET_PASSWORD, payload);
};

const verifyOtp = async (payload: { email: string; otp: string }) => {
  return await instances.privateRequest.post(API.AUTH.VERIFY_OTP, payload);
};

const changePassword = async (payload: { email: string; password: string }) => {
  return await instances.privateRequest.post(API.AUTH.CHANGE_PASSWORD, payload);
};

// Verify Email
const verifyEmail = async (token: string) => {
  return await instances.privateRequest.get(API.AUTH.VERIFY_EMAIL(token));
};

// ---------- EXPORT ----------
export const requests = {
  // Auth
  register,
  logIn,
  logOut,
  checkAuth,
  resetPassword,
  verifyOtp,
  changePassword,
  verifyEmail, // <-- added
};
