import { useState, useMemo } from 'react';
import { Box, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useTheme } from '../../../utils/ThemeContext';

// Import our new components
import FilterBar from './FilterBar';
import ProgressTracker from './ProgressTracker';
import TaskTable from './TaskTable';
import { initialTasks, TASK_STATUSES } from './mockData';

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
  const { mode } = useTheme();

  // Toggle expanded state for a row
  const toggleRowExpanded = taskId => {
    setExpandedRows(prev => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

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
        return matchesSearch && matchesStatus && matchesSprint && matchesType;
      }),
    [tasks, searchQuery, status, sprint, type],
  );

  return (
    <Box sx={{ px: 3 }}>
      {/* Filters and Search */}
      <FilterBar
        mode={mode}
        status={status}
        setStatus={setStatus}
        sprint={sprint}
        setSprint={setSprint}
        type={type}
        setType={setType}
        setSearchQuery={setSearchQuery}
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
        sx={{ textTransform: 'none', mt: 2 }}
      >
        Create issue
      </Button>
    </Box>
  );
};

export default ProjectTimeline;
