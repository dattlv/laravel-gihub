import { Link } from '@inertiajs/react';
import { useThemeColors } from '@/hooks/useThemeColors';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Paper,
  Tooltip,
  styled,
  Button,
  Fab,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import AddTaskIcon from '@mui/icons-material/AddTask';

const drawerWidth = 256;

// Styled component để tùy chỉnh Drawer
const StyledDrawer = styled(Drawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  width: open ? drawerWidth : 72,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    width: open ? drawerWidth : 72,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const { mode } = useThemeColors();
  const themeColors = useThemeColors();
  const [mounted, setMounted] = useState(false);

  // Đảm bảo hydration khớp
  useEffect(() => {
    setMounted(true);
  }, []);

  const navigation = [
    {
      name: 'Dashboard',
      href: route('dashboard'),
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      current: route().current('dashboard'),
    },
    {
      name: 'Sprint Management',
      href: route('sprints.index'),
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      current: route().current('sprints.index'),
    },
    {
      name: 'My Tasks',
      href: '#',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
      current: false,
    },
    {
      name: 'Projects',
      href: route('projects.index'),
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      ),
      current:
        route().current('projects.index') || route().current('projects.show'),
    },
    {
      name: 'Calendar',
      href: '#',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      current: false,
    },
    {
      name: 'Team',
      href: '#',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      current: false,
    },
    {
      name: 'Reports',
      href: '#',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      current: false,
    },
  ];

  const projects = [
    { id: 1, name: 'Website Redesign', color: 'bg-pink-600' },
    { id: 2, name: 'Mobile App', color: 'bg-purple-600' },
    { id: 3, name: 'Database Migration', color: 'bg-yellow-500' },
  ];

  if (!mounted) return null;

  return (
    <>
      {/* Toggle Button - Nằm ngoài Drawer để không bị ảnh hưởng bởi drawer transitions */}
      <Fab
        size="small"
        color={mode === 'dark' ? 'default' : 'primary'}
        aria-label="toggle sidebar"
        onClick={() => setIsCollapsed(!isCollapsed)}
        sx={{
          position: 'fixed',
          left: !isCollapsed ? drawerWidth - 20 : 52,
          top: 80,
          zIndex: theme => theme.zIndex.drawer + 1,
          transition: theme =>
            theme.transitions.create(['left'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          bgcolor: mode === 'dark' ? themeColors.background.paper : undefined,
          color: mode === 'dark' ? themeColors.text.primary : undefined,
          '&:hover': {
            bgcolor:
              mode === 'dark' ? themeColors.background.subtle : undefined,
          },
          height: 30,
          width: 30,
          minHeight: 30,
        }}
      >
        {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </Fab>

      <StyledDrawer
        variant="permanent"
        open={!isCollapsed}
        sx={{
          display: { xs: 'none', md: 'block' },
        }}
      >
        {/* Search Section - Only show when expanded */}
        {!isCollapsed && (
          <Box sx={{ px: 1, mt: 11, mr: 2, pr: 2 }}>
            <Paper
              component="div"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                bgcolor: themeColors.background.subtle,
                border: `1px solid ${themeColors.border.light}`,
                borderRadius: 1,
              }}
            >
              <Box sx={{ ml: 1, color: themeColors.text.secondary }}>
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Box>
              <input
                type="text"
                placeholder="Search tasks..."
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: '8px 8px',
                  outline: 'none',
                  width: '100%',
                  color: themeColors.text.primary,
                }}
              />
            </Paper>
          </Box>
        )}

        {/* Main Navigation */}
        <List sx={{ mt: 1 }}>
          {navigation.map(item => (
            <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
              <Tooltip
                title={isCollapsed ? item.name : ''}
                placement="right"
                disableHoverListener={!isCollapsed}
              >
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={item.current}
                  sx={{
                    minHeight: 36,
                    justifyContent: isCollapsed ? 'center' : 'initial',
                    px: 2,
                    borderRadius: '8px',
                    mx: 1,
                    my: 0.5,
                    '&.Mui-selected': {
                      bgcolor:
                        mode === 'dark'
                          ? 'rgba(144, 202, 249, 0.08)'
                          : 'rgba(25, 118, 210, 0.08)',
                      '&:hover': {
                        bgcolor:
                          mode === 'dark'
                            ? 'rgba(144, 202, 249, 0.12)'
                            : 'rgba(25, 118, 210, 0.12)',
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isCollapsed ? 'auto' : 3,
                      justifyContent: 'center',
                      color: item.current
                        ? 'primary.main'
                        : themeColors.text.secondary,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{
                      opacity: isCollapsed ? 0 : 1,
                      color: item.current
                        ? 'primary.main'
                        : themeColors.text.primary,
                      '& .MuiListItemText-primary': {
                        fontSize: '15px',
                        fontWeight: item.current ? 600 : 400,
                      },
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>

        {/* Recent Projects Section - Only show when expanded */}
        {!isCollapsed && (
          <Box sx={{ mt: 2, px: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{
                px: 1,
                fontSize: '0.75rem',
                fontWeight: 600,
                color: themeColors.text.secondary,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Recent Projects
            </Typography>
            <List>
              {projects.map(project => (
                <ListItem key={project.id} disablePadding>
                  <ListItemButton
                    sx={{
                      borderRadius: '8px',
                      mb: 0.5,
                      '&:hover': {
                        bgcolor: themeColors.action.hover,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        mr: 2,
                      }}
                      className={project.color}
                    />
                    <ListItemText
                      primary={project.name}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: themeColors.text.primary,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Theme Toggle for collapsed mode */}
        {isCollapsed && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <ThemeToggle />
          </Box>
        )}

        {/* Quick Actions - Only show when expanded */}
        {!isCollapsed && (
          <Box
            sx={{
              mt: 'auto',
              p: 2,
              borderTop: `1px solid ${themeColors.border.light}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Tooltip title="New Task">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<AddTaskIcon />}
                sx={{ mb: 1 }}
              >
                New Task
              </Button>
            </Tooltip>
            <Tooltip title="New Project">
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AddIcon />}
                sx={{
                  borderColor: themeColors.border.main,
                  color: themeColors.text.primary,
                  '&:hover': {
                    borderColor: themeColors.text.primary,
                    bgcolor: themeColors.action.hover,
                  },
                }}
              >
                New Project
              </Button>
            </Tooltip>
          </Box>
        )}
      </StyledDrawer>
    </>
  );
}
