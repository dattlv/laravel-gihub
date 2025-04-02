import React from 'react';
import { useState, useCallback } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import AddTaskIcon from '@mui/icons-material/AddTask';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';

export const useSidebarLogic = () => {
  const [openMenus, setOpenMenus] = useState({});

  const handleMenuClick = useCallback(menuId => {
    setOpenMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  }, []);

  const getIcon = useCallback(iconName => {
    switch (iconName) {
      case 'dashboard':
        return <DashboardIcon />;
      case 'task':
        return <TaskIcon />;
      case 'settings':
        return <SettingsIcon />;
      case 'kanban':
        return <ViewKanbanIcon />;
      case 'addTask':
        return <AddTaskIcon />;
      case 'security':
        return <SecurityIcon />;
      case 'notifications':
        return <NotificationsIcon />;
      default:
        return <DashboardIcon />;
    }
  }, []);

  return {
    openMenus,
    handleMenuClick,
    getIcon,
  };
};
