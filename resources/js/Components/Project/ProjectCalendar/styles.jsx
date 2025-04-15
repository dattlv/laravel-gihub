import { styled } from '@mui/material/styles';
import { Calendar } from 'react-big-calendar';
import { alpha } from '@mui/material/styles';

export const StyledCalendar = styled(Calendar)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,

  // Calendar container
  '& .rbc-calendar': {
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
  },

  // Toolbar
  '& .rbc-toolbar': {
    padding: theme.spacing(1, 2),
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor:
      theme.palette.mode === 'light'
        ? alpha(theme.palette.primary.main, 0.05)
        : alpha(theme.palette.primary.main, 0.15),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1rem',
  },

  '& .rbc-toolbar button': {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.75, 1.5),
    border: `1px solid ${theme.palette.divider}`,
    margin: theme.spacing(0.5),
    fontSize: '0.875rem',
    transition: 'all 0.2s',

    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      borderColor: theme.palette.primary.light,
    },

    '&.rbc-active': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      boxShadow: theme.shadows[2],
      borderColor: theme.palette.primary.main,
    },
  },

  // Time grid
  '& .rbc-time-view': {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.background.paper,
  },

  '& .rbc-time-header': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? alpha(theme.palette.primary.main, 0.05)
        : alpha(theme.palette.primary.main, 0.15),
  },

  '& .rbc-time-header-content': {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },

  '& .rbc-header': {
    fontWeight: 500,
    padding: theme.spacing(1),
    fontSize: '0.875rem',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
  },

  '& .rbc-day-bg': {
    backgroundColor: theme.palette.background.paper,

    '&.rbc-today': {
      backgroundColor:
        theme.palette.mode === 'light'
          ? alpha(theme.palette.secondary.main, 0.15)
          : alpha(theme.palette.secondary.main, 0.25),
    },
  },

  // Time slots
  '& .rbc-time-slot': {
    borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
    minHeight: '65px',
    color: theme.palette.text.secondary,
    fontSize: '0.75rem',
    overflow: 'visible',
  },

  '& .rbc-timeslot-group': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    minHeight: '65px',
  },

  // Fixed time gutter styling for both light/dark modes
  '& .rbc-time-gutter, & .rbc-time-header-gutter': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? alpha(theme.palette.grey[100], 0.7)
        : alpha(theme.palette.background.default, 0.5),
    color: theme.palette.text.secondary,
  },

  // Time content area
  '& .rbc-time-content': {
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.divider}`,
  },

  // Day columns
  '& .rbc-day-slot': {
    backgroundColor: theme.palette.background.paper,
  },

  // Events
  '& .rbc-event': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '2px',
    border: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    padding: theme.spacing(0.75, 1.5),
    fontSize: '0.875rem',
    fontWeight: 500,
    marginTop: '1px',
    marginBottom: '1px',
    opacity: 0.85,
    transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',

    '&:hover': {
      opacity: 1,
      zIndex: 10,
      transform: 'translateY(-1px)',
      boxShadow: theme.shadows[3],
    },
  },

  '& .rbc-event-label': {
    fontSize: '0.75rem',
    marginBottom: theme.spacing(0.5),
    fontWeight: 700,
  },

  '& .rbc-event-content': {
    fontSize: '0.875rem',
  },

  // Current time indicator
  '& .rbc-current-time-indicator': {
    backgroundColor: theme.palette.error.main,
    height: '1px',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-4px',
      left: '-5px',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: theme.palette.error.main,
    },
  },

  // All day cells
  '& .rbc-allday-cell': {
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    backgroundColor: theme.palette.background.paper,
  },

  // Selected cell
  '& .rbc-selected-cell': {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
  },

  // Month view
  '& .rbc-month-view': {
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.background.paper,
  },

  // Month rows and cells
  '& .rbc-month-row, & .rbc-row-bg': {
    backgroundColor: theme.palette.background.paper,
  },

  // Agenda view
  '& .rbc-agenda-view': {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.background.paper,
    overflow: 'hidden',

    // Đảm bảo khung nhìn bảng chiếm đủ không gian có sẵn
    display: 'flex',
    flexDirection: 'column',
    height: '100%',

    // Sửa lỗi cuộn và căn chỉnh
    '& > *': {
      width: '100%',
    },

    // Force table to take full width and maintain alignment between header and body
    '& table.rbc-agenda-table': {
      borderCollapse: 'collapse',
      width: '100%',
      tableLayout: 'fixed',
      maxWidth: '100%',

      // Make header sticky
      '& thead': {
        position: 'sticky',
        top: 0,
        zIndex: 5,
        width: '100%',
        display: 'table',
        tableLayout: 'fixed',
      },

      // Stare body và đảm bảo tbody có width 100%
      '& tbody': {
        width: '100%',
        display: 'table',
        tableLayout: 'fixed',
      },

      // Configure column widths consistently - sự thống nhất quan trọng
      '& thead tr th:nth-of-type(1)': { width: '25%' },
      '& tbody tr td:nth-of-type(1)': { width: '25%' },

      '& thead tr th:nth-of-type(2)': { width: '15%' },
      '& tbody tr td:nth-of-type(2)': { width: '15%' },

      '& thead tr th:nth-of-type(3)': { width: '60%' },
      '& tbody tr td:nth-of-type(3)': { width: '60%' },

      // General styling for all cells
      '& th, & td': {
        padding: theme.spacing(1.5),
        borderBottom: `1px solid ${theme.palette.divider}`,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },

      // Đảm bảo trạng thái hàng hoàn toàn khớp với các cột
      '& tr': {
        display: 'table-row',
        width: '100%',
      },

      // Header styling
      '& thead > tr > th': {
        fontSize: '0.875rem',
        fontWeight: 600,
        backgroundColor:
          theme.palette.mode === 'light'
            ? alpha(theme.palette.primary.main, 0.05)
            : alpha(theme.palette.primary.main, 0.15),
      },

      // Body styling
      '& tbody > tr': {
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },

        '& td': {
          fontSize: '0.875rem',
          color: theme.palette.text.primary,
        },
      },
    },

    // Đảm bảo khung chứa nội dung agenda có cùng độ rộng
    '& .rbc-agenda-content': {
      width: '100%',
      maxWidth: '100%',
      overflow: 'auto',

      '& table': {
        width: '100%',
        maxWidth: '100%',
      },
    },

    // Đảm bảo thanh cuộn không làm ảnh hưởng đến bố cục
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: alpha(theme.palette.text.primary, 0.2),
      borderRadius: '4px',
    },
  },

  // Container for events - make it support overlapping
  '& .rbc-day-slot .rbc-events-container': {
    marginRight: 0,
    overflow: 'visible',
  },
}));
