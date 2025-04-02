import { useState } from 'react';
import { routes } from '../../../config/routes';
import { useAuth } from '../../../hooks/useAuth';

export const useNavbarLogic = () => {
  const { user, isAuthenticated } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getInitials = name => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return {
    user,
    isAuthenticated,
    anchorEl,
    handleMenu,
    handleClose,
    getInitials,
    routes,
  };
};
