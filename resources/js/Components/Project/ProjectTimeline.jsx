import React from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  Button,
  Box,
  InputAdornment,
  Badge,
  MenuItem,
  Select,
  FormControl,
  IconButton,
  Collapse,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  BoltOutlined as TaskIcon,
  NoteOutlined as NoteIcon,
  MoreVert as MoreVertIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const initialTasks = [
  {
    id: 'F00011',
    name: 'Triển khai chấm công cho bên Nhật',
    type: 'task',
    status: 'IN PROGRESS',
    startDate: '13 Mar, 2025',
    dueDate: '20 Mar, 2025',
    priority: 'Normal',
    parent: '-',
    sprint: 'Sprint 4 - Xử lý feedback bên TKO, Sprint 2',
  },
  {
    id: 'F00012',
    name: 'Web - Feedback Customer Sprint 3 v2.1',
    type: 'task',
    status: 'IN PROGRESS',
    startDate: 'No start date',
    dueDate: 'No due date',
    priority: 'Normal',
    parent: '-',
    sprint:
      'Sprint 2, Sprint 3, Sprint 4 - Xử lý feedback bên TKO, Sprint 5, Sprint 6',
  },
  {
    id: 'F00019',
    name: 'App - Feedback Customer Sprint 3 v2.1',
    type: 'task',
    status: 'DONE',
    startDate: 'No start date',
    dueDate: 'No due date',
    priority: 'Normal',
    parent: '-',
    sprint: 'Sprint 3, Sprint 4 - Xử lý feedback bên TKO',
  },
  {
    id: 'F00046',
    name: 'Note',
    type: 'note',
    status: 'DONE',
    startDate: 'No start date',
    dueDate: 'No due date',
    priority: 'Normal',
    parent: 'F00019',
    sprint: 'Sprint 3, Sprint 4 - Xử lý feedback bên TKO',
  },
  {
    id: 'F00050',
    name: '[App] Điều chỉnh giờ chặn từ 18h30 sang 19h',
    type: 'note',
    status: 'DONE',
    startDate: 'No start date',
    dueDate: '8 Mar, 2025',
    priority: 'Normal',
    parent: 'F00019',
    sprint: 'Sprint 4 - Xử lý feedback bên TKO',
  },
  {
    id: 'F00054',
    name: '[App] Xem được đơn remote/ công tác đã gửi',
    type: 'note',
    status: 'DONE',
    startDate: 'No start date',
    dueDate: '15 Mar, 2025',
    priority: 'Normal',
    parent: 'F00019',
    sprint: 'Sprint 4 - Xử lý feedback bên TKO',
  },
  {
    id: 'F00061',
    name: 'Note',
    type: 'note',
    status: 'TO DO',
    startDate: 'No start date',
    dueDate: 'No due date',
    priority: 'Normal',
    parent: 'Add parent',
    sprint: 'Sprint 4 - Xử lý feedback bên TKO',
  },
  {
    id: 'F00020',
    name: 'Sprint 5',
    type: 'task',
    status: 'IN PROGRESS',
    startDate: 'No start date',
    dueDate: 'No due date',
    priority: 'Normal',
    parent: '-',
    sprint: 'Sprint 6, Sprint 5',
  },
];

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
}));

const StyledChip = styled(Chip)(({ theme, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'IN PROGRESS':
        return { bg: theme.palette.info.light, color: theme.palette.info.dark };
      case 'DONE':
        return {
          bg: theme.palette.success.light,
          color: theme.palette.success.dark,
        };
      case 'TO DO':
        return { bg: theme.palette.grey[100], color: theme.palette.grey[700] };
      default:
        return { bg: theme.palette.grey[100], color: theme.palette.grey[700] };
    }
  };
  const colors = getStatusColor();
  return {
    backgroundColor: colors.bg,
    color: colors.color,
    fontWeight: 500,
  };
});

// Get type icon
const getTypeIcon = type =>
  type === 'task' ? (
    <TaskIcon color="secondary" />
  ) : (
    <NoteIcon color="primary" />
  );

export default function ProjectTimeline() {
  const [expandedRows, setExpandedRows] = React.useState({});
  const [tasks] = React.useState(initialTasks);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [sprint, setSprint] = React.useState('');
  const [type, setType] = React.useState('');

  // Toggle expanded state for a row
  const toggleRowExpanded = taskId => {
    setExpandedRows(prev => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  // Progress calculation
  const todoCount = tasks.filter(task => task.status === 'TO DO').length;
  const inProgressCount = tasks.filter(
    task => task.status === 'IN PROGRESS',
  ).length;
  const doneCount = tasks.filter(task => task.status === 'DONE').length;
  const totalTasks = tasks.length;
  const progressPercentage = Math.round((doneCount / totalTasks) * 100);

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = searchQuery
      ? task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.id.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesStatus = status ? task.status === status : true;
    const matchesSprint = sprint ? task.sprint.includes(sprint) : true;
    const matchesType = type ? task.type === type.toLowerCase() : true;
    return matchesSearch && matchesStatus && matchesSprint && matchesType;
  });

  return (
    <Box sx={{ bgcolor: 'grey.100', minHeight: '100vh', p: 3 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        {/* Filters and Search */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search tasks..."
            size="small"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            sx={{ minWidth: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={status}
              onChange={e => setStatus(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="TO DO">To Do</MenuItem>
              <MenuItem value="IN PROGRESS">In Progress</MenuItem>
              <MenuItem value="DONE">Done</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={sprint}
              onChange={e => setSprint(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">All Sprints</MenuItem>
              <MenuItem value="Sprint 2">Sprint 2</MenuItem>
              <MenuItem value="Sprint 3">Sprint 3</MenuItem>
              <MenuItem value="Sprint 4">Sprint 4</MenuItem>
              <MenuItem value="Sprint 5">Sprint 5</MenuItem>
              <MenuItem value="Sprint 6">Sprint 6</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={type}
              onChange={e => setType(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="Task">Task</MenuItem>
              <MenuItem value="Note">Note</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Progress Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Badge badgeContent={todoCount} color="default" />
            <Badge badgeContent={inProgressCount} color="primary" />
            <Badge badgeContent={doneCount} color="success" />
          </Box>

          <Box
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}
          >
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: 'grey.200',
                borderRadius: 1,
                height: 8,
              }}
            >
              <Box
                sx={{
                  width: `${progressPercentage}%`,
                  bgcolor: 'success.main',
                  height: '100%',
                  borderRadius: 1,
                  transition: 'width 0.3s ease-in-out',
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {progressPercentage}% Complete
            </Typography>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell padding="checkbox" width={48} />
                <StyledTableCell padding="checkbox" width={48}>
                  Type
                </StyledTableCell>
                <StyledTableCell padding="checkbox" width={48}>
                  <MoreVertIcon fontSize="small" />
                </StyledTableCell>
                <StyledTableCell>Key</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Start Date</StyledTableCell>
                <StyledTableCell>Due Date</StyledTableCell>
                <StyledTableCell>Priority</StyledTableCell>
                <StyledTableCell>Parent</StyledTableCell>
                <StyledTableCell>Sprint</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.map(task => (
                <React.Fragment key={task.id}>
                  <TableRow hover>
                    <StyledTableCell>
                      {task.type === 'task' && (
                        <StyledIconButton
                          size="small"
                          onClick={() => toggleRowExpanded(task.id)}
                        >
                          {expandedRows[task.id] ? (
                            <KeyboardArrowDownIcon fontSize="small" />
                          ) : (
                            <KeyboardArrowRightIcon fontSize="small" />
                          )}
                        </StyledIconButton>
                      )}
                    </StyledTableCell>
                    <StyledTableCell>{getTypeIcon(task.type)}</StyledTableCell>
                    <StyledTableCell>
                      <StyledIconButton size="small">
                        <MoreVertIcon fontSize="small" />
                      </StyledIconButton>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography color="primary">{task.id}</Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography>{task.name}</Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <StyledChip
                        label={task.status}
                        size="small"
                        status={task.status}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body2" color="text.secondary">
                        {task.startDate}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body2" color="text.secondary">
                        {task.dueDate}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body2" color="text.secondary">
                        {task.priority}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography
                        variant="body2"
                        color={
                          task.parent === 'Add parent'
                            ? 'text.disabled'
                            : 'secondary'
                        }
                        sx={{
                          fontStyle:
                            task.parent === 'Add parent' ? 'italic' : 'normal',
                        }}
                      >
                        {task.parent}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          maxWidth: 200,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {task.sprint}
                      </Typography>
                    </StyledTableCell>
                  </TableRow>

                  {/* Child Tasks */}
                  {task.type === 'task' && (
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={11}
                      >
                        <Collapse
                          in={expandedRows[task.id]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box sx={{ py: 2, pl: 6 }}>
                            <Typography
                              variant="subtitle2"
                              gutterBottom
                              component="div"
                            >
                              Child Tasks
                            </Typography>
                            <Table size="small">
                              <TableBody>
                                {/* You can map child tasks here */}
                                {tasks
                                  .filter(
                                    childTask => childTask.parent === task.id,
                                  )
                                  .map(childTask => (
                                    <TableRow key={childTask.id} hover>
                                      <StyledTableCell />
                                      <StyledTableCell>
                                        {getTypeIcon(childTask.type)}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        <StyledIconButton size="small">
                                          <MoreVertIcon fontSize="small" />
                                        </StyledIconButton>
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        <Typography color="primary">
                                          {childTask.id}
                                        </Typography>
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        <Typography>
                                          {childTask.name}
                                        </Typography>
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        <StyledChip
                                          label={childTask.status}
                                          size="small"
                                          status={childTask.status}
                                        />
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          {childTask.startDate}
                                        </Typography>
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          {childTask.dueDate}
                                        </Typography>
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          {childTask.priority}
                                        </Typography>
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        <Typography
                                          variant="body2"
                                          color="secondary"
                                        >
                                          {childTask.parent}
                                        </Typography>
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                          sx={{
                                            maxWidth: 200,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                          }}
                                        >
                                          {childTask.sprint}
                                        </Typography>
                                      </StyledTableCell>
                                    </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        size="small"
        sx={{ textTransform: 'none' }}
      >
        Create issue
      </Button>
    </Box>
  );
}

ProjectTimeline.propTypes = {
  searchQuery: PropTypes.string,
};
