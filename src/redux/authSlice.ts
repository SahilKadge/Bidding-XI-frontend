// src/authSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { requests } from "../axios/requests";
import type { User, AuthState, LoginFormData, RegisterFormData, ForgotPasswordFormData, VerifyOtpFormData, ChangePasswordFormData } from "../types/auth";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  message: null,
};

// ---------- ASYNC THUNKS ----------

// Register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload: RegisterFormData, { rejectWithValue }) => {
    try {
      const res = await requests.register(payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: LoginFormData, { rejectWithValue }) => {
    try {
      const res = await requests.logIn(payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await requests.logOut();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Check Auth
export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await requests.checkAuth();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload: ForgotPasswordFormData, { rejectWithValue }) => {
    try {
      const res = await requests.resetPassword(payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (payload: VerifyOtpFormData, { rejectWithValue }) => {
    try {
      const res = await requests.verifyOtp(payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Change Password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await requests.changePassword(payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Verify Email
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token: string, { rejectWithValue }) => {
    try {
      const res = await requests.verifyEmail(token);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ---------- SLICE ----------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.message = null;
    });

    // Check Auth
    builder.addCase(checkAuthStatus.fulfilled, (state, action: PayloadAction<any>) => {
      state.user = action.payload.user;
    });

    // Reset Password
    builder.addCase(resetPassword.fulfilled, (state, action: PayloadAction<any>) => {
      state.message = action.payload.message;
    });

    // Verify OTP
    builder.addCase(verifyOtp.fulfilled, (state, action: PayloadAction<any>) => {
      state.message = action.payload.message;
    });

    // Change Password
    builder.addCase(changePassword.fulfilled, (state, action: PayloadAction<any>) => {
      state.message = action.payload.message;
    });

    // Verify Email
    builder.addCase(verifyEmail.fulfilled, (state, action: PayloadAction<any>) => {
      state.message = action.payload.message;
    });
  },
});

export const { resetAuthState, setUser } = authSlice.actions;
export default authSlice.reducer;