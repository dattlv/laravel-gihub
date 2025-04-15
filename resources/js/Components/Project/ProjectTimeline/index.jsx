import { useState, useMemo, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useTheme } from '../../../utils/ThemeContext';
import ProjectLoader from '../../common/ProjectLoader';

// Import our new components
import ProgressTracker from './ProgressTracker';
import TaskTable from './TaskTable';
import { initialTasks, SPRINT_OPTIONS, TASK_STATUSES } from './mockData';
import FilterBar from '../../common/FilterSelect';

/**
 * ProjectTimeline component displays a list of tasks in a timeline view
 * with filtering, sorting and grouping capabilities.
 */
const ProjectTimeline = () => {
  // State variables
  const [expandedRows, setExpandedRows] = useState({});
  const [tasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('');
  const [sprint, setSprint] = useState('');
  const [type, setType] = useState('');
  const [priority, setPriority] = useState('');
  const [loading, setLoading] = useState(true);
  const { mode } = useTheme();

  // Simulate loading data
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Toggle expanded state for a row
  const toggleRowExpanded = taskId => {
    setExpandedRows(prev => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const filters = [
    {
      name: 'Status',
      value: status,
      onChange: e => setStatus(e.target.value),
      options: [
        { value: TASK_STATUSES.TODO, label: 'To Do' },
        { value: TASK_STATUSES.IN_PROGRESS, label: 'In Progress' },
        { value: TASK_STATUSES.DONE, label: 'Done' },
      ],
      emptyOptionText: 'All Status',
    },
    {
      name: 'Sprints',
      value: sprint,
      onChange: e => setSprint(e.target.value),
      options: SPRINT_OPTIONS.map(sprint => ({ value: sprint, label: sprint })),
      emptyOptionText: 'All Sprints',
      width: 150,
    },
    {
      name: 'Types',
      value: type,
      onChange: e => setType(e.target.value),
      options: [
        { value: 'Task', label: 'Task' },
        { value: 'Note', label: 'Note' },
      ],
      emptyOptionText: 'All Types',
    },
    {
      name: 'Priority',
      value: priority,
      onChange: e => setPriority(e.target.value),
      options: [
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' },
      ],
      emptyOptionText: 'All Priorities',
    },
  ];
  // Calculate task counts for progress display
  const taskCounts = useMemo(() => {
    const todoCount = tasks.filter(
      task => task.status === TASK_STATUSES.TODO,
    ).length;
    const inProgressCount = tasks.filter(
      task => task.status === TASK_STATUSES.IN_PROGRESS,
    ).length;
    const doneCount = tasks.filter(
      task => task.status === TASK_STATUSES.DONE,
    ).length;

    return {
      todoCount,
      inProgressCount,
      doneCount,
      totalTasks: tasks.length,
    };
  }, [tasks]);

  // Filter tasks based on search and filters
  const filteredTasks = useMemo(
    () =>
      tasks.filter(task => {
        const matchesSearch = searchQuery
          ? task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.id.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
        const matchesStatus = status ? task.status === status : true;
        const matchesSprint = sprint ? task.sprint.includes(sprint) : true;
        const matchesType = type ? task.type === type.toLowerCase() : true;
        const matchesPriority = priority ? task.priority === priority : true;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesSprint &&
          matchesType &&
          matchesPriority
        );
      }),
    [tasks, searchQuery, status, sprint, type, priority],
  );

  return (
    <Box sx={{ px: 2 }}>
      {loading ? (
        <ProjectLoader.Timeline />
      ) : (
        <>
          {/* Filters and Search */}
          <FilterBar
            searchProps={{
              placeholder: 'Tìm kiếm ...',
              width: 250,
              onChange: e => setSearchQuery(e.target.value),
            }}
            filters={filters}
            spacing={2}
            mode={mode}
          />

          {/* Progress Section */}
          <ProgressTracker
            todoCount={taskCounts.todoCount}
            inProgressCount={taskCounts.inProgressCount}
            doneCount={taskCounts.doneCount}
            totalTasks={taskCounts.totalTasks}
          />

          {/* Task Table */}
          <TaskTable
            filteredTasks={filteredTasks}
            expandedRows={expandedRows}
            toggleRowExpanded={toggleRowExpanded}
            allTasks={tasks}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="small"
            sx={{ textTransform: 'none' }}
          >
            Create issue
          </Button>
        </>
      )}
    </Box>
  );
};
export default ProjectTimeline;
