import { useCallback, useState, useEffect, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Avatar,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BoltIcon from '@mui/icons-material/Bolt';
import GroupIcon from '@mui/icons-material/Group';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import PropTypes from 'prop-types';
import { useTheme } from '../../../utils/ThemeContext';
import { darkTheme } from '../../../utils/theme';
import { SearchField } from '../../common/SearchField';
import ProjectLoader from '../../common/ProjectLoader';
import ProjectCalendar from '../ProjectCalendar';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// Initialize dayjs plugins
dayjs.extend(customParseFormat);

// Styled components
const BoardColumn = styled(Paper)(({ theme, mode }) => ({
  padding: theme.spacing(1),
  background:
    mode === 'light' ? '#f4f5f7' : darkTheme.palette.background.subtle,
  borderRadius: 5,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  minWidth: 280,
}));

const ColumnHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  width: '100%',
}));

const ColumnContent = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
}));

const IssueCard = styled(Paper)(({ theme, isDragging, mode }) => ({
  marginBottom: theme.spacing(1),
  borderRadius: 3,
  boxShadow: isDragging
    ? '0 5px 10px rgba(0,0,0,0.15)'
    : '0 1px 2px rgba(0,0,0,0.1)',
  padding: theme.spacing(1.5),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor:
      mode === 'light'
        ? darkTheme.palette.text.primary
        : darkTheme.palette.text.disabled,
  },
}));

const HeaderButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: 3,
  fontWeight: 500,
  boxShadow: 'none',
  marginLeft: theme.spacing(1),
  padding: '2px 8px',
}));

export default function ProjectSprint() {
  const { mode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('board'); // 'board' or 'calendar'

  // Simulate loading data
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Define columns
  const columns = [
    { id: 'todo', title: 'TO DO', count: 1 },
    { id: 'inProgress', title: 'IN PROGRESS', count: 1 },
    {
      id: 'done',
      title: 'DONE',
      icon: <CheckCircleOutlineIcon fontSize="small" color="success" />,
    },
  ];

  // Initial board state
  const [boardState, setBoardState] = useState({
    todo: [
      {
        id: 'issue-1',
        code: 'SCRUM-1',
        title: 'issue 1',
        assignee: 'PD',
        dueDate: 'Apr 15', // Add due date here
      },
    ],
    inProgress: [
      {
        id: 'issue-2',
        code: 'SCRUM-2',
        title: 'giao dien login',
        assignee: 'PD',
        dueDate: 'Apr 18', // Add due date here
      },
    ],
    done: [],
  });

  // Handle creating a new issue
  const createIssue = status => {
    // Demo functionality for creating a new issue
    const newIssue = {
      id: `issue-${Math.random().toString(36).substr(2, 5)}`,
      code: `SCRUM-${Math.floor(Math.random() * 100) + 3}`,
      title: 'New Issue',
      assignee: 'PD',
      dueDate: dayjs().format('MMM D'),
    };

    const newBoardState = { ...boardState };
    newBoardState[status] = [...newBoardState[status], newIssue];
    setBoardState(newBoardState);
  };

  // Handle drag end event
  const handleDragEnd = useCallback(
    result => {
      const { source, destination } = result;

      // If dropped outside or no destination
      if (!destination) {
        return;
      }

      // If dropped in the same position
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      // Create a copy of the current state
      const newBoardState = { ...boardState };

      // Get items from source
      const sourceItems = [...newBoardState[source.droppableId]];

      // Remove item from source
      const [removedItem] = sourceItems.splice(source.index, 1);

      // If moving between different columns
      if (source.droppableId !== destination.droppableId) {
        // Get items at destination
        const destinationItems = [...newBoardState[destination.droppableId]];

        // Add item to destination
        destinationItems.splice(destination.index, 0, removedItem);

        // Update state with new arrays
        newBoardState[source.droppableId] = sourceItems;
        newBoardState[destination.droppableId] = destinationItems;
      } else {
        // If moving within the same column, just update position
        sourceItems.splice(destination.index, 0, removedItem);
        newBoardState[source.droppableId] = sourceItems;
      }

      // Update state
      setBoardState(newBoardState);
    },
    [boardState],
  );

  // Add CSS for drag and drop effects
  useEffect(() => {
    const styleId = 'drag-drop-styles';
    if (!document.getElementById(styleId)) {
      const styleTag = document.createElement('style');
      styleTag.id = styleId;
      styleTag.innerHTML = `
        .dragging-over {
          background-color: rgba(9, 30, 66, 0.08);
          border: 1px dashed rgba(9, 30, 66, 0.3);
        }
        .item-dragging {
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15) !important;
        }
        .column-content {
          min-height: 50px;
        }
      `;
      document.head.appendChild(styleTag);
    }

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  // Handle view change
  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  // Convert board issues to calendar events for calendar view
  const calendarEvents = useMemo(() => {
    const events = [];

    // Iterate through all columns and their issues
    Object.entries(boardState).forEach(([status, issues]) => {
      issues.forEach(issue => {
        // Convert due date string to Date object if necessary
        let dueDate = issue.dueDate;
        if (typeof dueDate === 'string') {
          // Parse date string like "Apr 15" into a Date object
          dueDate = dayjs(dueDate, 'MMM D').toDate();
        }

        events.push({
          id: issue.id,
          title: issue.title,
          description: issue.code,
          priority:
            status === 'todo'
              ? 'high'
              : status === 'inProgress'
                ? 'medium'
                : 'low',
          start: dueDate,
          end: dueDate,
          assignee: issue.assignee,
          status: status,
        });
      });
    });

    return events;
  }, [boardState]);

  // Handle calendar event updates
  const handleCalendarEventUpdate = updatedEvent => {
    // Find the column this event belongs to
    const { id, status: currentStatus } = updatedEvent;
    let foundInColumn = null;
    let issueToUpdate = null;

    // Find the column and issue to update
    Object.entries(boardState).some(([column, issues]) => {
      const issueIndex = issues.findIndex(issue => issue.id === id);
      if (issueIndex >= 0) {
        foundInColumn = column;
        issueToUpdate = issues[issueIndex];
        return true;
      }
      return false;
    });

    if (!issueToUpdate) return; // No matching issue found

    // Create new board state based on update type
    const newBoardState = { ...boardState };

    // If status changed, move issue to new column
    if (currentStatus && currentStatus !== foundInColumn) {
      // Remove from original column
      newBoardState[foundInColumn] = newBoardState[foundInColumn].filter(
        issue => issue.id !== id,
      );

      // Add to target column
      if (newBoardState[currentStatus]) {
        const updatedIssue = {
          ...issueToUpdate,
          title: updatedEvent.title,
          dueDate: dayjs(updatedEvent.start).format('MMM D'),
        };
        newBoardState[currentStatus] = [
          ...newBoardState[currentStatus],
          updatedIssue,
        ];
      }
    } else {
      // Just update the issue in place
      const updatedIssues = newBoardState[foundInColumn].map(issue => {
        if (issue.id === id) {
          return {
            ...issue,
            title: updatedEvent.title,
            dueDate: dayjs(updatedEvent.start).format('MMM D'),
          };
        }
        return issue;
      });

      newBoardState[foundInColumn] = updatedIssues;
    }

    setBoardState(newBoardState);
  };

  return (
    <Box sx={{ px: 2 }}>
      {loading ? (
        <ProjectLoader.Board />
      ) : (
        <>
          {/* Header Section */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography fontSize="18px" fontWeight="600">
                SCRUM Sprint 1
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">8 days</Typography>
                </Box>

                <Box sx={{ display: 'flex' }}>
                  <ToggleButtonGroup
                    value={view}
                    exclusive
                    onChange={handleViewChange}
                    size="small"
                    sx={{ mr: 2 }}
                  >
                    <ToggleButton value="board" aria-label="board view">
                      <ViewKanbanIcon fontSize="small" />
                    </ToggleButton>
                    <ToggleButton value="calendar" aria-label="calendar view">
                      <CalendarMonthIcon fontSize="small" />
                    </ToggleButton>
                  </ToggleButtonGroup>

                  <HeaderButton variant="outlined" startIcon={<BoltIcon />}>
                    Start stand-up
                  </HeaderButton>
                  <HeaderButton variant="contained" color="primary">
                    Complete sprint
                  </HeaderButton>
                  <Button
                    sx={{
                      ml: 1,
                      p: 0,
                      minWidth: 32,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    variant="outlined"
                  >
                    <MoreHorizIcon fontSize="small" />
                  </Button>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SearchField
                  placeholder="Search"
                  size="small"
                  sx={{ width: 200 }}
                  mode={mode}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <Box sx={{ display: 'flex', ml: 2 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: '#0052CC' }}>
                    PD
                  </Avatar>
                  <Avatar
                    sx={{ width: 32, height: 32, ml: -0.5, bgcolor: '#6554C0' }}
                  >
                    JD
                  </Avatar>
                  <IconButton size="small" sx={{ ml: 1 }}>
                    <GroupIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mr: 1, fontSize: 13 }}
                >
                  GROUP BY
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 1,
                    mr: 1,
                  }}
                  endIcon={<MoreHorizIcon fontSize="small" />}
                >
                  None
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<SettingsIcon fontSize="small" />}
                  sx={{ textTransform: 'none', borderRadius: 1, mr: 1 }}
                >
                  Insights
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<SettingsIcon fontSize="small" />}
                  sx={{ textTransform: 'none', borderRadius: 1 }}
                >
                  View settings
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Toggle between board and calendar views */}
          {view === 'board' ? (
            /* Kanban Board */
            <DragDropContext onDragEnd={handleDragEnd}>
              <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
                {columns.map(column => (
                  <BoardColumn key={column.id} elevation={0} mode={mode}>
                    <ColumnHeader>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {column.icon && column.icon}
                        <Typography
                          variant="subtitle2"
                          fontWeight="600"
                          sx={{ ml: column.icon ? 0.5 : 0 }}
                        >
                          {column.title} {column.count && column.count}
                        </Typography>
                      </Box>
                      <IconButton size="small">
                        <MoreHorizIcon fontSize="small" />
                      </IconButton>
                    </ColumnHeader>

                    <Droppable droppableId={column.id}>
                      {(provided, snapshot) => (
                        <ColumnContent
                          mode={mode}
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="column-content"
                          sx={{
                            backgroundColor: snapshot.isDraggingOver
                              ? 'rgba(9, 30, 66, 0.04)'
                              : 'transparent',
                            transition: 'background-color 0.2s ease',
                            borderRadius: 1,
                            mb: 1,
                          }}
                        >
                          {boardState[column.id]?.map((issue, index) => (
                            <Draggable
                              key={issue.id}
                              draggableId={issue.id}
                              index={index}
                            >
                              {provided => (
                                <IssueCard
                                  mode={mode}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  elevation={0}
                                >
                                  <Box>
                                    <Typography
                                      variant="body2"
                                      sx={{ mb: 1, color: 'text.white' }}
                                    >
                                      {issue.title}
                                    </Typography>
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            mt: 0.5,
                                          }}
                                        >
                                          <AccessTimeIcon
                                            sx={{
                                              fontSize: 14,
                                              mr: 0.5,
                                              color: 'text.white',
                                            }}
                                          />
                                          <Typography
                                            variant="caption"
                                            color="text.white"
                                          >
                                            {issue.dueDate || 'Apr 15'}
                                          </Typography>
                                        </Box>
                                      </Box>
                                      <Avatar
                                        sx={{
                                          width: 24,
                                          height: 24,
                                          fontSize: 12,
                                          bgcolor: '#0052CC',
                                        }}
                                      >
                                        {issue.assignee}
                                      </Avatar>
                                    </Box>
                                  </Box>
                                </IssueCard>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </ColumnContent>
                      )}
                    </Droppable>

                    <Button
                      startIcon={<AddIcon />}
                      variant="text"
                      size="small"
                      onClick={() => createIssue(column.id)}
                      sx={{
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                        color: 'text.secondary',
                        py: 1,
                      }}
                    >
                      Create issue
                    </Button>
                  </BoardColumn>
                ))}

                {/* Add column button */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    bgcolor:
                      mode === 'light'
                        ? '#f4f5f7'
                        : darkTheme.palette.background.subtle,

                    borderRadius: 1,
                    cursor: 'pointer',
                  }}
                >
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            </DragDropContext>
          ) : (
            /* Calendar View */
            <ProjectCalendar
              events={calendarEvents}
              onEventUpdate={handleCalendarEventUpdate}
            />
          )}
        </>
      )}
    </Box>
  );
}

ProjectSprint.propTypes = {
  searchQuery: PropTypes.string,
};
