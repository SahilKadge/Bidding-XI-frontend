export const API = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    CHECK_AUTH: "/auth/check-auth",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_OTP: "/auth/verify-otp",
    CHANGE_PASSWORD: "/auth/change-password",
    VERIFY_EMAIL: (token: string) => `/auth/verify/${token}`, // function returns URL
    MANAGER_ONLY: "/auth/manager-only",
    TEAM_ONLY: "/auth/team-only",
  },
};
