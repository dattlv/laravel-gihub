import { useState, useCallback } from 'react';

export const useSprintBoard = initialSprint => {
  const [isEditing, setIsEditing] = useState(false);
  const [sprint, setSprint] = useState(initialSprint);

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleEditSave = useCallback(updatedSprint => {
    setSprint(updatedSprint);
    setIsEditing(false);
  }, []);

  const calculateProgress = useCallback(() => {
    const totalTasks = sprint.tasks?.length || 0;
    if (totalTasks === 0) return 0;

    const completedTasks =
      sprint.tasks?.filter(task => task.status === 'completed').length || 0;
    return (completedTasks / totalTasks) * 100;
  }, [sprint.tasks]);

  const getStatusColor = useCallback(status => {
    const statusColors = {
      active: 'success',
      pending: 'warning',
      completed: 'info',
      blocked: 'error',
    };
    return statusColors[status] || 'default';
  }, []);

  return {
    sprint,
    isEditing,
    handleEditClick,
    handleEditCancel,
    handleEditSave,
    calculateProgress,
    getStatusColor,
  };
};
