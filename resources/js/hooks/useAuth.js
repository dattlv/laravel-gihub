import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  login,
  logout,
  clearError,
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from '../store/slices/authSlice';

export function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const handleLogin = useCallback(
    async credentials => {
      try {
        await dispatch(login(credentials)).unwrap();
        return true;
      } catch (error) {
        return error;
      }
    },
    [dispatch],
  );

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logout()).unwrap();
      return true;
    } catch (err) {
      return err;
    }
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout,
    clearError: handleClearError,
  };
}
