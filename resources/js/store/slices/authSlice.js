import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk('auth/login', async credentials => {
  const response = await window.fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
});

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await window.fetch('/logout', {
    method: 'POST',
    headers: {
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
    },
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }
});

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError } = authSlice.actions;

export const selectAuth = state => state.auth;
export const selectUser = state => state.auth.user;
export const selectIsAuthenticated = state => state.auth.isAuthenticated;
export const selectAuthLoading = state => state.auth.loading;
export const selectAuthError = state => state.auth.error;

export default authSlice.reducer;
