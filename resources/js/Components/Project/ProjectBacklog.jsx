/* eslint-disable indent */
import { useState, useCallback, memo, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Box,
  Typography,
  Button,
  Collapse,
  Stack,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  Settings as SettingsIcon,
  Share as ShareIcon,
  MoreHoriz as MoreHorizIcon,
  DragIndicator as DragIndicatorIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1),
  fontSize: '13px',
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  fontWeight: 500,
  fontSize: '0.75rem',
}));

// Styled component for the target sprint
const SprintBox = styled(Box)(({ theme, isDraggingOver }) => ({
  position: 'relative',
  marginBottom: theme.spacing(2),
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  transform: isDraggingOver ? 'scale(1.01)' : 'scale(1)',
  zIndex: isDraggingOver ? 2 : 1,
  '&:after': isDraggingOver
    ? {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: theme.shape.borderRadius,
        border: `2px dashed ${theme.palette.primary.main}`,
        backgroundColor: 'rgba(25, 118, 210, 0.04)',
        zIndex: 0,
        pointerEvents: 'none',
      }
    : {},
}));

const STATUS_OPTIONS = [
  { value: 'TO DO', label: 'To Do' },
  { value: 'IN PROGRESS', label: 'In Progress' },
  { value: 'DONE', label: 'Done' },
];

// Memoized Issue Component with Draggable wrapper
const IssueItem = memo(function IssueItem({
  issue,
  index,
  sprintId,
  handleStatusChange,
}) {
  if (issue === 'create') {
    return (
      <TableRow
        sx={{
          backgroundColor: '#F7F8FA',
          height: 1,
          '& td': {
            border: 'none',
            padding: '4px 8px',
          },
        }}
      >
        <StyledTableCell colSpan={8} style={{ width: '100%' }}>
          <Button
            startIcon={<AddIcon fontSize="small" />}
            size="small"
            sx={{
              textTransform: 'none',
              color: 'text.secondary',
              padding: '2px 8px',
              minHeight: '24px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderColor: 'rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            Create issue
          </Button>
        </StyledTableCell>
      </TableRow>
    );
  }

  const getStatusBgColor = status => {
    switch (status) {
      case 'DONE':
        return '#e8f5e9'; // light green
      case 'IN PROGRESS':
        return '#e3f2fd'; // light blue
      default:
        return '#f5f5f5'; // light gray
    }
  };

  const getStatusTextColor = status => {
    switch (status) {
      case 'DONE':
        return 'success.dark';
      case 'IN PROGRESS':
        return 'primary.dark';
      default:
        return 'text.secondary';
    }
  };

  const getPriorityColor = priority => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'error';
      case 'normal':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Draggable draggableId={`issue-${issue.id}`} index={index}>
      {(provided, snapshot) => (
        <TableRow
          ref={provided.innerRef}
          {...provided.draggableProps}
          sx={{
            backgroundColor: snapshot.isDragging
              ? 'rgba(25, 118, 210, 0.08)'
              : 'inherit',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
          }}
        >
          <StyledTableCell {...provided.dragHandleProps}>
            <DragIndicatorIcon
              fontSize="small"
              sx={{ color: 'text.secondary' }}
            />
          </StyledTableCell>
          <StyledTableCell>{issue.key}</StyledTableCell>
          <StyledTableCell>{issue.name}</StyledTableCell>
          <StyledTableCell>
            <FormControl
              size="small"
              sx={{
                backgroundColor: getStatusBgColor(issue.status),
                borderRadius: 1,
                minWidth: 60,
                height: 30,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
                  '&.Mui-focused fieldset': {
                    borderStyle: 'none',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  padding: '5px',
                },
                '& .MuiList-root-MuiMenu-list': {
                  fontSize: '12px',
                },
              }}
            >
              <Select
                value={issue.status}
                onChange={e =>
                  handleStatusChange(issue.id, sprintId, e.target.value)
                }
                sx={{
                  fontWeight: 500,
                  color: getStatusTextColor(issue.status),
                }}
                onClick={e => e.stopPropagation()}
                renderValue={value => (
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ color: getStatusTextColor(value), fontSize: '12px' }}
                  >
                    {STATUS_OPTIONS.find(option => option.value === value)
                      ?.label || value}
                  </Typography>
                )}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root': {
                        minHeight: 30,
                        padding: '2px 10px',
                        fontSize: '12px',
                      },
                      '& .MuiList-padding': {
                        padding: '4px 0',
                      },
                      maxHeight: 200,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                      marginTop: '2px',
                    },
                  },
                }}
              >
                {STATUS_OPTIONS.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: getStatusBgColor(option.value),
                        borderRadius: 1,
                        py: 0.3,
                        px: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        sx={{
                          color: getStatusTextColor(option.value),
                          fontSize: '12px',
                        }}
                      >
                        {option.label}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </StyledTableCell>
          <StyledTableCell>
            <StyledChip
              label={issue.priority}
              color={getPriorityColor(issue.priority)}
              size="small"
              variant="outlined"
            />
          </StyledTableCell>
          <StyledTableCell>{issue.sprint}</StyledTableCell>
          <StyledTableCell>{issue.parent}</StyledTableCell>
          <StyledTableCell align="right">
            <StyledIconButton size="small">
              <MoreVertIcon fontSize="small" />
            </StyledIconButton>
          </StyledTableCell>
        </TableRow>
      )}
    </Draggable>
  );
});

// Sprint Header Component
const SprintHeader = memo(function SprintHeader({
  sprint,
  isExpanded,
  onToggleExpand,
}) {
  const completedCount = sprint.issues.filter(
    issue => issue.status === 'DONE',
  ).length;
  const inProgressCount = sprint.issues.filter(
    issue => issue.status === 'IN PROGRESS',
  ).length;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1,
        borderRadius: 1,
      }}
    >
      <StyledIconButton size="small" onClick={onToggleExpand} sx={{ mr: 1 }}>
        {isExpanded ? (
          <KeyboardArrowDownIcon fontSize="small" />
        ) : (
          <KeyboardArrowRightIcon fontSize="small" />
        )}
      </StyledIconButton>

      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          component="span"
          fontWeight={600}
          fontSize={14}
        >
          {sprint.id}
        </Typography>
        {sprint.dateRange && (
          <Typography
            variant="body2"
            color="text.secondary"
            component="span"
            sx={{ ml: 1 }}
          >
            {sprint.dateRange}
          </Typography>
        )}
        {sprint.issueCount > 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            component="span"
            sx={{ ml: 1 }}
          >
            ({sprint.issueCount} issues)
          </Typography>
        )}
      </Box>

      <Stack direction="row" spacing={1} alignItems="center">
        {sprint.status !== 'planning' && (
          <>
            <Typography variant="body2" color="text.secondary">
              0
            </Typography>
            <Chip
              label={completedCount}
              size="small"
              color="primary"
              sx={{ minWidth: 30 }}
            />
            <Chip
              label={inProgressCount}
              size="small"
              color="success"
              sx={{ minWidth: 30 }}
            />
          </>
        )}
        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
          {(sprint.id !== 'Backlog' &&
            (sprint.status === 'planning'
              ? 'Start sprint'
              : 'Complete sprint')) ||
            'Create sprint'}
        </Button>
        <StyledIconButton size="small">
          <MoreHorizIcon fontSize="small" />
        </StyledIconButton>
      </Stack>
    </Box>
  );
});

// Main Component
export default function ProjectBacklog({ searchQuery }) {
  const [expandedSprints, setExpandedSprints] = useState({
    'Scrum Sprint 1': true,
    'Scrum Sprint 2': true,
    Backlog: true,
  });

  const [sprints, setSprints] = useState([
    {
      id: 'Scrum Sprint 1',
      dateRange: '9 Apr – 23 Apr',
      issueCount: 2,
      status: 'complete',
      issues: [
        {
          id: 1,
          key: 'E00006',
          name: 'Sửa lại Tab Backlog & Sprint theo Meeting Note 27/12',
          status: 'DONE',
          priority: 'High',
          sprint: 'Sprint 1',
          parent: '-',
        },
        {
          id: 2,
          key: 'F00053',
          name: 'Chuyển Storage sang Azure',
          status: 'IN PROGRESS',
          priority: 'Normal',
          sprint: 'Sprint 1',
          parent: '-',
        },
      ],
    },
    {
      id: 'Scrum Sprint 2',
      dateRange: '23 Apr – 7 May',
      issueCount: 0,
      status: 'planning',
      issues: [],
    },
    {
      id: 'Backlog',
      issueCount: 0,
      issues: [],
    },
  ]);

  // Toggle sprint expanded state
  const toggleSprintExpanded = useCallback(sprintId => {
    setExpandedSprints(prev => ({
      ...prev,
      [sprintId]: !prev[sprintId],
    }));
  }, []);

  // Handle status change for issues
  const handleStatusChange = useCallback((issueId, sprintId, newStatus) => {
    setSprints(prevSprints =>
      prevSprints.map(sprint => {
        if (sprint.id === sprintId) {
          return {
            ...sprint,
            issues: sprint.issues.map(issue =>
              issue.id === issueId ? { ...issue, status: newStatus } : issue,
            ),
          };
        }
        return sprint;
      }),
    );
  }, []);

  // Filter issues based on search query
  const getFilteredIssues = useCallback((issues, query) => {
    if (!query) return issues;

    return issues.filter(
      issue =>
        issue.name.toLowerCase().includes(query.toLowerCase()) ||
        issue.key.toLowerCase().includes(query.toLowerCase()),
    );
  }, []);

  // Handle drag end event - supports reordering within sprints and moving between sprints
  const handleDragEnd = useCallback(
    result => {
      const { destination, source } = result;

      // Drop was cancelled or dropped outside a droppable
      if (!destination) {
        return;
      }

      // Dropped in the same place
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      // Handle issue movement - both within the same sprint and between different sprints
      const sourceSprintId = source.droppableId;
      const destinationSprintId = destination.droppableId;

      // Find the source sprint
      const sourceSprintIndex = sprints.findIndex(s => s.id === sourceSprintId);
      if (sourceSprintIndex === -1) return;

      // Create a copy of the sprints array
      const newSprints = [...sprints];

      // Get the issue to move
      const sourceIssues = [...newSprints[sourceSprintIndex].issues];
      const [movedIssue] = sourceIssues.splice(source.index, 1);

      // Update the source sprint with the issue removed
      newSprints[sourceSprintIndex] = {
        ...newSprints[sourceSprintIndex],
        issues: sourceIssues,
        issueCount: sourceIssues.length,
      };

      // If moving to a different sprint
      if (sourceSprintId !== destinationSprintId) {
        // Find the destination sprint
        const destinationSprintIndex = sprints.findIndex(
          s => s.id === destinationSprintId,
        );
        if (destinationSprintIndex === -1) return;

        // Update the issue's sprint field
        const updatedIssue = {
          ...movedIssue,
          sprint: destinationSprintId,
        };

        // Get the destination issues array
        const destinationIssues = [
          ...newSprints[destinationSprintIndex].issues,
        ];

        // Insert the moved issue at the correct position
        destinationIssues.splice(destination.index, 0, updatedIssue);

        // Update the destination sprint
        newSprints[destinationSprintIndex] = {
          ...newSprints[destinationSprintIndex],
          issues: destinationIssues,
          issueCount: destinationIssues.length,
        };
      } else {
        // Moving within the same sprint, insert at the new position
        sourceIssues.splice(destination.index, 0, movedIssue);

        // Update the sprint with the reordered issues
        newSprints[sourceSprintIndex] = {
          ...newSprints[sourceSprintIndex],
          issues: sourceIssues,
          issueCount: sourceIssues.length,
        };
      }

      setSprints(newSprints);
    },
    [sprints],
  );

  // Add CSS styles for drag and drop
  useMemo(() => {
    if (!document.getElementById('drag-drop-styles')) {
      const styleTag = document.createElement('style');
      styleTag.id = 'drag-drop-styles';
      styleTag.innerHTML = `
        .dragging-over {
          background-color: rgba(25, 118, 210, 0.04);
          border: 2px dashed rgba(25, 118, 210, 0.7);
        }
        .issue-dragging {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          background-color: white !important;
        }
      `;
      document.head.appendChild(styleTag);
    }
  }, []);

  return (
    <Box sx={{ p: 2, pt: 0 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>
            Backlog
          </Typography>
          <Stack direction="row" spacing={1}>
            <StyledIconButton>
              <ShareIcon fontSize="small" />
            </StyledIconButton>
            <StyledIconButton>
              <MoreHorizIcon fontSize="small" />
            </StyledIconButton>
          </Stack>
        </Box>

        <Stack direction="row" spacing={2}>
          <StyledIconButton>
            <SettingsIcon />
          </StyledIconButton>
        </Stack>
      </Box>

      {/* Drag and Drop Context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Sprints */}
        {sprints.map(sprint => {
          // Pre-calculate filtered issues
          const filteredIssues = getFilteredIssues(sprint.issues, searchQuery);

          return (
            <SprintBox
              key={sprint.id}
              data-sprint-id={sprint.id}
              sx={{
                p: 1,
                borderRadius: 4,
                bgcolor: '#F7F8FA',
              }}
            >
              <SprintHeader
                sprint={sprint}
                isExpanded={expandedSprints[sprint.id]}
                onToggleExpand={() => toggleSprintExpanded(sprint.id)}
              />

              <Collapse in={expandedSprints[sprint.id]}>
                {/* Issues Container */}
                <Droppable droppableId={sprint.id}>
                  {(providedDroppable, snapshotDroppable) =>
                    filteredIssues.length > 0 ? (
                      <Box>
                        <TableContainer
                          component={Paper}
                          variant="outlined"
                          sx={{
                            bgcolor: snapshotDroppable.isDraggingOver
                              ? 'rgba(25, 118, 210, 0.04)'
                              : 'background.paper',
                            position: 'relative',
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                            border: snapshotDroppable.isDraggingOver
                              ? '1px solid rgba(25, 118, 210, 0.5)'
                              : undefined,
                            transition: 'all 0.2s ease',
                            mb: 1.5,
                          }}
                        >
                          <Table size="small">
                            <TableBody
                              ref={providedDroppable.innerRef}
                              {...providedDroppable.droppableProps}
                            >
                              {filteredIssues.map((issue, index) => (
                                <IssueItem
                                  key={issue.id}
                                  issue={issue}
                                  index={index}
                                  sprintId={sprint.id}
                                  handleStatusChange={handleStatusChange}
                                />
                              ))}
                              <IssueItem
                                issue="create"
                                index={filteredIssues.length}
                              />
                              {providedDroppable.placeholder}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    ) : (
                      <Box
                        ref={providedDroppable.innerRef}
                        {...providedDroppable.droppableProps}
                        sx={{
                          p: 2,
                          textAlign: 'center',
                          borderRadius: 1,
                          border: snapshotDroppable.isDraggingOver
                            ? '1px dashed rgba(25, 118, 210, 0.7)'
                            : '1px dashed rgba(0, 0, 0, 0.12)',
                          borderColor: snapshotDroppable.isDraggingOver
                            ? 'primary.main'
                            : 'divider',
                          borderStyle: 'dashed',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                          minHeight: '50px',
                        }}
                      >
                        <Typography color="text.secondary" fontSize="12px">
                          {sprint.id === 'Backlog'
                            ? 'Your backlog is empty.'
                            : 'Plan a sprint by dragging the sprint footer down below some issues, or by dragging issues here.'}
                        </Typography>

                        <Button
                          variant="outlined"
                          startIcon={<AddIcon />}
                          size="small"
                          sx={{
                            textTransform: 'none',
                            borderColor: 'rgba(0, 0, 0, 0.12)',
                            color: 'text.secondary',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.04)',
                              borderColor: 'rgba(0, 0, 0, 0.2)',
                            },
                          }}
                        >
                          Create issue in{' '}
                          {sprint.id.split(' ')[0].toLowerCase()}
                        </Button>
                        {providedDroppable.placeholder}
                      </Box>
                    )
                  }
                </Droppable>
              </Collapse>
            </SprintBox>
          );
        })}
      </DragDropContext>
    </Box>
  );
}
