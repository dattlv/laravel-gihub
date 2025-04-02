export const routes = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'dashboard',
  },
  {
    title: 'Tasks',
    path: '/tasks',
    icon: 'task',
    children: [
      {
        title: 'Task List',
        path: '/tasks/list',
        icon: 'task',
      },
      {
        title: 'Create Task',
        path: '/tasks/create',
        icon: 'addTask',
      },
      {
        title: 'Kanban Board',
        path: '/tasks/board',
        icon: 'kanban',
      },
    ],
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: 'settings',
  },
];
