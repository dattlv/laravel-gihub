import React, { useRef, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Tooltip,
  useTheme,
  Avatar,
  Chip,
  Paper,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  ChevronLeft,
  ChevronRight,
  Today,
  ViewDay,
  ViewWeek,
  CalendarViewMonth,
  ViewAgenda,
  AccessTime,
} from '@mui/icons-material';
import { format } from 'date-fns';

// Custom Toolbar
export const CustomToolbar = props => {
  const theme = useTheme();
  const { date, onNavigate, onView, view } = props;

  const goToToday = () => {
    onNavigate('TODAY');
  };

  const goToPrev = () => {
    onNavigate('PREV');
  };

  const goToNext = () => {
    onNavigate('NEXT');
  };

  const viewOptions = [
    { key: 'day', label: 'Day', icon: <ViewDay fontSize="small" /> },
    { key: 'week', label: 'Week', icon: <ViewWeek fontSize="small" /> },
    {
      key: 'month',
      label: 'Month',
      icon: <CalendarViewMonth fontSize="small" />,
    },
    { key: 'agenda', label: 'Agenda', icon: <ViewAgenda fontSize="small" /> },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        p: 1,
        bgcolor:
          theme.palette.mode === 'light'
            ? 'rgba(25, 118, 210, 0.05)'
            : 'rgba(25, 118, 210, 0.15)',
        borderRadius: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title="Previous">
          <IconButton onClick={goToPrev} size="small" sx={{ mx: 0.5 }}>
            <ChevronLeft />
          </IconButton>
        </Tooltip>

        <Button
          variant="contained"
          startIcon={<Today />}
          size="small"
          onClick={goToToday}
          sx={{
            mx: 1,
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Today
        </Button>

        <Tooltip title="Next">
          <IconButton onClick={goToNext} size="small" sx={{ mx: 0.5 }}>
            <ChevronRight />
          </IconButton>
        </Tooltip>

        <Typography
          variant="h6"
          sx={{
            ml: 2,
            fontWeight: 500,
            fontSize: '1.1rem',
          }}
        >
          {format(date, view === 'day' ? 'EEEE, MMMM d, yyyy' : 'MMMM yyyy')}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        {viewOptions.map(option => (
          <Button
            key={option.key}
            onClick={() => onView(option.key)}
            variant={view === option.key ? 'contained' : 'outlined'}
            startIcon={option.icon}
            size="small"
            sx={{
              m: 0.5,
              backgroundColor:
                view === option.key
                  ? theme.palette.primary.main
                  : 'transparent',
              color: view === option.key ? 'white' : theme.palette.text.primary,
              '&:hover': {
                backgroundColor:
                  view === option.key
                    ? theme.palette.primary.dark
                    : theme.palette.action.hover,
              },
            }}
          >
            {option.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

// Custom time slot wrapper
export const CustomTimeSlotWrapper = ({ value, children }) => {
  const theme = useTheme();
  const isFullHour = value.getMinutes() === 0;

  return React.cloneElement(children, {
    style: {
      ...children.props.style,
      backgroundColor: isFullHour
        ? theme.palette.mode === 'light'
          ? 'rgba(0, 0, 0, 0.02)'
          : 'rgba(255, 255, 255, 0.02)'
        : 'transparent',
      borderTop: isFullHour
        ? `2px solid ${theme.palette.divider}`
        : `1px dashed ${theme.palette.divider}`,
      position: 'relative',
      ...(isFullHour && {
        '&::after': {
          content: `"${format(value, 'HH:mm')}"`,
          position: 'absolute',
          left: -60,
          top: -10,
          fontSize: '0.75rem',
          fontWeight: 'bold',
          color: theme.palette.text.secondary,
        },
      }),
    },
  });
};

// Enhanced tooltip content for tasks
const TaskTooltip = ({ event }) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        p: 1.5,
        maxWidth: 300,
        boxShadow: theme.shadows[4],
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        {event.title}
      </Typography>

      {event.description && (
        <Typography variant="body2" mb={1.5} color="text.secondary">
          {event.description}
        </Typography>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <AccessTime sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
        <Typography variant="body2" color="text.secondary">
          {format(event.start, 'dd MMM yyyy HH:mm')} -{' '}
          {format(event.end, 'HH:mm')}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
        {event.priority && (
          <Chip
            label={`Priority: ${event.priority}`}
            size="small"
            color={
              event.priority === 'high'
                ? 'error'
                : event.priority === 'medium'
                  ? 'warning'
                  : 'success'
            }
            sx={{ height: 22 }}
          />
        )}

        {event.status && (
          <Chip
            label={`Status: ${event.status}`}
            size="small"
            color={
              event.status === 'todo'
                ? 'info'
                : event.status === 'inProgress'
                  ? 'warning'
                  : 'success'
            }
            sx={{ height: 22 }}
          />
        )}

        {event.assignee && (
          <Chip
            label={`Assignee: ${event.assignee}`}
            size="small"
            sx={{ height: 22 }}
            avatar={
              <Avatar sx={{ width: 16, height: 16, fontSize: '0.65rem' }}>
                {event.assignee.substring(0, 1).toUpperCase()}
              </Avatar>
            }
          />
        )}
      </Box>
    </Paper>
  );
};

// Custom Event Wrapper with improved styling for overlapping events
export const CustomEventWrapper = ({ event, children }) => {
  const theme = useTheme();

  // Priority colors
  const priorityColors = {
    high:
      theme.palette.mode === 'light'
        ? theme.palette.error.main
        : theme.palette.error.light,
    medium:
      theme.palette.mode === 'light'
        ? theme.palette.warning.main
        : theme.palette.warning.light,
    low:
      theme.palette.mode === 'light'
        ? theme.palette.success.main
        : theme.palette.success.light,
  };

  const backgroundColor =
    priorityColors[event.priority] || theme.palette.primary.main;

  // Left border color based on status
  const statusColors = {
    todo:
      theme.palette.mode === 'light'
        ? theme.palette.info.main
        : theme.palette.info.light,
    inProgress:
      theme.palette.mode === 'light'
        ? theme.palette.warning.main
        : theme.palette.warning.light,
    done:
      theme.palette.mode === 'light'
        ? theme.palette.success.main
        : theme.palette.success.light,
  };

  const borderColor = event.status
    ? statusColors[event.status]
    : backgroundColor;

  // Get initials from assignee for the avatar
  const getInitials = name => {
    if (!name) return '';

    const names = name.split(' ');
    if (names.length === 1) return name.charAt(0).toUpperCase();
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  return React.cloneElement(children, {
    style: {
      ...children.props.style,
      margin: '2px 0',
      zIndex: 1,
      transition: 'all 0.2s ease',
    },
    children: (
      <Tooltip
        title={<TaskTooltip event={event} />}
        placement="top"
        arrow
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: 'transparent',
              p: 0,
              boxShadow: 'none',
              maxWidth: 'none',
            },
          },
          arrow: {
            sx: {
              color: theme.palette.background.paper,
            },
          },
        }}
      >
        <Box
          sx={{
            height: '24px', // Increased height for better visibility
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: backgroundColor,
            borderLeft: `3px solid ${borderColor}`,
            borderRadius: '3px',
            boxShadow:
              theme.palette.mode === 'dark'
                ? '0 1px 3px rgba(0,0,0,0.3)'
                : '0 1px 2px rgba(0,0,0,0.15)',
            py: 0.3,
            px: 0.8,
            opacity: 0.85, // Slightly transparent to see overlapping events
            '&:hover': {
              opacity: 1,
              transform: 'translateY(-1px) scale(1.01)',
              boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
              zIndex: 10, // Bring to front when hovering
              position: 'relative',
            },
            cursor: 'pointer',
            position: 'relative', // For proper stacking
            // Custom gradient background effect
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background: `linear-gradient(to right, ${alpha(backgroundColor, 0.9)}, ${alpha(backgroundColor, 1)})`,
              borderRadius: '3px',
              zIndex: -1,
            },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.getContrastText(backgroundColor),
              fontWeight: 600, // Bolder text for better readability
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: '0.8rem', // Slightly larger text
              flexGrow: 1,
              textShadow: '0 1px 1px rgba(0,0,0,0.1)', // Text shadow for better contrast
            }}
          >
            {event.title}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: theme.palette.getContrastText(backgroundColor),
              fontSize: '0.7rem',
              ml: 0.5,
              flexShrink: 0,
              fontWeight: 500,
            }}
          >
            {format(event.start, 'HH:mm')}
          </Typography>

          {event.assignee && (
            <Avatar
              sx={{
                width: 18, // Slightly larger avatar
                height: 18,
                fontSize: '0.65rem',
                ml: 0.7,
                bgcolor: alpha(theme.palette.common.white, 0.25),
                color: theme.palette.getContrastText(backgroundColor),
                border: '1px solid rgba(255,255,255,0.3)', // Subtle border for the avatar
              }}
            >
              {getInitials(event.assignee)}
            </Avatar>
          )}
        </Box>
      </Tooltip>
    ),
  });
};

// Custom Day Slot component that limits visible events and adds scrolling
export const CustomDaySlot = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Find the events container within this slot
    if (containerRef.current) {
      const eventsContainer = containerRef.current.querySelector(
        '.rbc-events-container',
      );

      if (eventsContainer) {
        const events = eventsContainer.querySelectorAll('.rbc-event-content');

        // If more than 4 events, modify the container to enable scrolling
        if (events.length > 4) {
          // Set max height to fit 4 events (assuming each is ~22px tall + margins)
          eventsContainer.style.maxHeight = '100px'; // Adjust based on your event heights
          eventsContainer.style.overflowY = 'auto';
          eventsContainer.style.paddingRight = '4px';

          // Add subtle scrollbar styling
          eventsContainer.style.scrollbarWidth = 'thin';
          eventsContainer.style.scrollbarColor = 'rgba(0,0,0,0.2) transparent';

          // For webkit browsers
          const styleElement = document.createElement('style');
          styleElement.textContent = `
            .rbc-events-container::-webkit-scrollbar {
              width: 5px;
            }
            .rbc-events-container::-webkit-scrollbar-track {
              background: transparent;
            }
            .rbc-events-container::-webkit-scrollbar-thumb {
              background-color: rgba(0,0,0,0.2);
              border-radius: 20px;
            }
          `;
          document.head.appendChild(styleElement);

          // Add a gradient fade at the bottom to indicate more content
          const fadeIndicator = document.createElement('div');
          fadeIndicator.style.position = 'absolute';
          fadeIndicator.style.bottom = '0';
          fadeIndicator.style.left = '0';
          fadeIndicator.style.right = '0';
          fadeIndicator.style.height = '15px';
          fadeIndicator.style.background =
            'linear-gradient(to bottom, transparent, rgba(255,255,255,0.8))';
          fadeIndicator.style.pointerEvents = 'none';
          fadeIndicator.style.zIndex = '10';
          eventsContainer.style.position = 'relative';
          eventsContainer.appendChild(fadeIndicator);
        }
      }
    }
  }, [children]);

  return <div ref={containerRef}>{children}</div>;
};

// Add this component
export const CustomMonthDateHeader = ({
  label,
  drilldownView,
  onDrillDown,
}) => (
  <Box
    sx={{
      textAlign: 'right',
      padding: '4px',
      fontWeight: 'medium',
      fontSize: '0.875rem',
      cursor: drilldownView ? 'pointer' : 'default',
      '&:hover': {
        backgroundColor: drilldownView ? 'rgba(0,0,0,0.04)' : 'transparent',
      },
    }}
    onClick={onDrillDown}
  >
    {label}
  </Box>
);

// Add this component for month view events
export const CustomDateCellWrapper = ({ children, value }) => {
  const cellRef = useRef(null);

  useEffect(() => {
    if (cellRef.current) {
      const events = cellRef.current.querySelectorAll('.rbc-event');

      if (events.length > 4) {
        // Show only first 3 events
        for (let i = 0; i < events.length; i++) {
          if (i >= 3) {
            events[i].style.display = 'none';
          }
        }

        // Create "more" indicator
        const moreEvents = events.length - 3;
        const moreIndicator = document.createElement('div');
        moreIndicator.className = 'rbc-event rbc-more-indicator';
        moreIndicator.style.backgroundColor = '#f0f0f0';
        moreIndicator.style.color = '#333';
        moreIndicator.style.padding = '2px 5px';
        moreIndicator.style.margin = '2px 0';
        moreIndicator.style.fontSize = '0.75rem';
        moreIndicator.style.textAlign = 'center';
        moreIndicator.style.borderRadius = '2px';
        moreIndicator.style.cursor = 'pointer';
        moreIndicator.innerText = `+ ${moreEvents} more`;

        // Insert after the 3rd event
        if (events[2].parentNode) {
          events[2].parentNode.insertBefore(
            moreIndicator,
            events[2].nextSibling,
          );
        }

        // Make the container scrollable when clicking on "more"
        moreIndicator.addEventListener('click', e => {
          e.stopPropagation();

          // Show all events
          for (let i = 0; i < events.length; i++) {
            if (i >= 3) {
              events[i].style.display = 'block';
            }
          }

          // Enable scrolling
          const container = cellRef.current.querySelector('.rbc-events');
          if (container) {
            container.style.maxHeight = '150px';
            container.style.overflowY = 'auto';
            container.style.paddingRight = '5px';
          }

          // Remove the "more" indicator
          moreIndicator.style.display = 'none';
        });
      }
    }
  }, [value, children]);

  return <div ref={cellRef}>{children}</div>;
};

// Custom Agenda Event component with tooltips
export const CustomAgendaEvent = ({ event }) => {
  const theme = useTheme();

  // Define colors based on priority with dark/light mode consideration
  const priorityColors = {
    high:
      theme.palette.mode === 'light'
        ? theme.palette.error.main
        : theme.palette.error.light,
    medium:
      theme.palette.mode === 'light'
        ? theme.palette.warning.main
        : theme.palette.warning.light,
    low:
      theme.palette.mode === 'light'
        ? theme.palette.success.main
        : theme.palette.success.light,
  };

  // Get the priority color
  const dotColor = priorityColors[event.priority] || theme.palette.primary.main;

  return (
    <Tooltip
      title={
        <Box sx={{ p: 0.5 }}>
          <Typography variant="subtitle2" fontWeight="bold">
            {event.title}
          </Typography>
          {event.description && (
            <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
              {event.description}
            </Typography>
          )}
          {event.priority && (
            <Chip
              label={`Priority: ${event.priority}`}
              size="small"
              color={
                event.priority === 'high'
                  ? 'error'
                  : event.priority === 'medium'
                    ? 'warning'
                    : 'success'
              }
              sx={{ height: 22, mr: 1, mt: 0.5 }}
            />
          )}
          {event.status && (
            <Chip
              label={`Status: ${event.status}`}
              size="small"
              color={
                event.status === 'todo'
                  ? 'info'
                  : event.status === 'inProgress'
                    ? 'warning'
                    : 'success'
              }
              sx={{ height: 22, mt: 0.5 }}
            />
          )}
        </Box>
      }
      arrow
      placement="top"
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            bgcolor: dotColor,
            mr: 1,
            flexShrink: 0,
          }}
        />
        <Typography
          variant="body2"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {event.title}
        </Typography>
      </Box>
    </Tooltip>
  );
};

// Custom component for agenda time cell
export const CustomAgendaTimeCell = ({ value, children }) => {
  // Check if value is a valid date before formatting
  const isValidDate = value && !isNaN(new Date(value).getTime());
  const formattedTime = isValidDate ? format(value, 'HH:mm') : 'Invalid time';

  return (
    <Tooltip title={formattedTime} placement="top" arrow>
      <div
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </div>
    </Tooltip>
  );
};

// Custom component for agenda date cell
export const CustomAgendaDateCell = ({ value, children }) => {
  // Check if value is a valid date before formatting
  const isValidDate = value && !isNaN(new Date(value).getTime());
  const formattedDate = isValidDate
    ? format(value, 'EEEE, MMMM d, yyyy')
    : 'Invalid date';

  return (
    <Tooltip title={formattedDate} placement="top" arrow>
      <div
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </div>
    </Tooltip>
  );
};
