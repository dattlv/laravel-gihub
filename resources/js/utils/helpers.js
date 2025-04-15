export const getStatusColor = status => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'success';
    case 'in progress':
      return 'primary';
    case 'planning':
      return 'info';
    case 'on hold':
      return 'warning';
    default:
      return 'default';
  }
};

export const getPriorityColor = priority => {
  switch (priority.toLowerCase()) {
    case 'high':
      return '#ef5350';
    case 'medium':
      return '#fb8c00';
    case 'low':
      return '#66bb6a';
    default:
      return '#78909c';
  }
};
