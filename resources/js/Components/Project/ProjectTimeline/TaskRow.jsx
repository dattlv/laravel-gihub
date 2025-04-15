import React, { useState, useEffect } from 'react';
import { Typography, TableRow, TableCell, Collapse, Box } from '@mui/material';
import PropTypes from 'prop-types';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  BoltOutlined as TaskIcon,
  NoteOutlined as NoteIcon,
} from '@mui/icons-material';
import {
  StyledTableCell,
  StyledIconButton,
  StyledChip,
} from './TimelineStyles';
import { TASK_TYPES } from './mockData';
import { isEmpty } from 'lodash';

const COLUMN_WIDTHS = {
  toggle: '3%',
  type: '4%',
  id: '7%',
  name: '25%',
  status: '10%',
  startDate: '10%',
  dueDate: '10%',
  priority: '7%',
  parent: '8%',
  sprint: '16%',
};

// Helper function to get type icon
const getTypeIcon = type =>
  type === TASK_TYPES.TASK ? (
    <TaskIcon color="secondary" />
  ) : (
    <NoteIcon color="primary" />
  );

// Component for task cells to reuse between parent and child tasks
const TaskCells = ({ task }) => (
  <>
    <StyledTableCell width={COLUMN_WIDTHS.id}>
      <Typography color="primary">{task.id}</Typography>
    </StyledTableCell>
    <StyledTableCell width={COLUMN_WIDTHS.name}>
      <Typography>{task.name}</Typography>
    </StyledTableCell>
    <StyledTableCell width={COLUMN_WIDTHS.status}>
      <StyledChip label={task.status} size="small" status={task.status} />
    </StyledTableCell>
    <StyledTableCell width={COLUMN_WIDTHS.startDate}>
      <Typography variant="body2" color="text.secondary">
        {task.startDate}
      </Typography>
    </StyledTableCell>
    <StyledTableCell width={COLUMN_WIDTHS.dueDate}>
      <Typography variant="body2" color="text.secondary">
        {task.dueDate}
      </Typography>
    </StyledTableCell>
    <StyledTableCell width={COLUMN_WIDTHS.priority}>
      <Typography variant="body2" color="text.secondary">
        {task.priority}
      </Typography>
    </StyledTableCell>
    <StyledTableCell width={COLUMN_WIDTHS.parent}>
      <Typography
        variant="body2"
        color={task.parent === 'Add parent' ? 'text.disabled' : 'secondary'}
        sx={{
          fontStyle: task.parent === 'Add parent' ? 'italic' : 'normal',
        }}
      >
        {task.parent}
      </Typography>
    </StyledTableCell>
    <StyledTableCell width={COLUMN_WIDTHS.sprint}>
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
  </>
);

TaskCells.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    parent: PropTypes.string.isRequired,
    sprint: PropTypes.string.isRequired,
  }).isRequired,
};

const TaskRow = ({ task, expandedRows, toggleRowExpanded, childTasks }) => {
  // Add local state for smooth animation
  const [isRotating, setIsRotating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(expandedRows[task.id] || false);

  // Update local state when parent state changes
  useEffect(() => {
    setIsExpanded(expandedRows[task.id] || false);
  }, [expandedRows, task.id]);

  // Handle toggle with animation
  const handleToggle = () => {
    setIsRotating(true);
    toggleRowExpanded(task.id);

    // Reset rotation state after animation completes
    setTimeout(() => {
      setIsRotating(false);
    }, 300);
  };

  const hasChildTasks = task.type === TASK_TYPES.TASK && !isEmpty(childTasks);

  return (
    <React.Fragment>
      <TableRow hover sx={{ '& .MuiTypography-root': { fontSize: '13px' } }}>
        <StyledTableCell width={COLUMN_WIDTHS.toggle}>
          {hasChildTasks && (
            <StyledIconButton
              size="small"
              onClick={handleToggle}
              sx={{
                transition: 'transform 0.3s ease',
                transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                '&.rotating': {
                  animation: 'rotate 0.3s ease',
                },
                '@keyframes rotate': {
                  '0%': {
                    transform: isExpanded ? 'rotate(-90deg)' : 'rotate(0deg)',
                  },
                  '100%': {
                    transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                  },
                },
              }}
              className={isRotating ? 'rotating' : ''}
            >
              <KeyboardArrowDownIcon fontSize="small" />
            </StyledIconButton>
          )}
        </StyledTableCell>
        <StyledTableCell width={COLUMN_WIDTHS.type}>
          {getTypeIcon(task.type)}
        </StyledTableCell>
        <TaskCells task={task} />
      </TableRow>

      {/* Child Tasks */}
      {hasChildTasks && (
        <TableRow>
          <TableCell style={{ padding: 0 }} colSpan={10}>
            <Collapse
              in={isExpanded}
              timeout={300}
              unmountOnExit
              sx={{
                transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: isExpanded ? 1 : 0,
              }}
            >
              <Box
                sx={{
                  opacity: isExpanded ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  transitionDelay: isExpanded ? '0.1s' : '0s',
                }}
              >
                {childTasks.map(childTask => (
                  <TableRow
                    key={childTask.id}
                    hover
                    sx={{
                      '& .MuiTypography-root': { fontSize: '13px' },
                      display: 'flex',
                    }}
                  >
                    <StyledTableCell
                      sx={{ borderBottom: 'none' }}
                      width={COLUMN_WIDTHS.toggle}
                    />
                    <StyledTableCell width={COLUMN_WIDTHS.type}>
                      {getTypeIcon(childTask.type)}
                    </StyledTableCell>
                    <TaskCells task={childTask} />
                  </TableRow>
                ))}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};

TaskRow.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    parent: PropTypes.string.isRequired,
    sprint: PropTypes.string.isRequired,
  }).isRequired,
  expandedRows: PropTypes.object.isRequired,
  toggleRowExpanded: PropTypes.func.isRequired,
  childTasks: PropTypes.array.isRequired,
};

export default TaskRow;
