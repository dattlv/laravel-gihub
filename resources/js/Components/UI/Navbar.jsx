import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../../utils/ThemeContext';
import { useThemeColors } from '@/hooks/useThemeColors';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  styled,
  Typography,
  Stack,
  Breadcrumbs,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { usePage } from '@inertiajs/react';

// Custom styled AppBar để ngăn sidebar đè lên
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

// PageHeader component để hiển thị tiêu đề và breadcrumb
export function PageHeader({ breadcrumbs }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        width: '100%',
        gap: { xs: 1, sm: 0 },
      }}
    >
      {breadcrumbs && (
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ fontSize: '13px' }}
        >
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            if (isLast) {
              return (
                <Typography key={index} color="text.secondary" fontSize="13px">
                  {crumb.icon && (
                    <Box
                      component="span"
                      sx={{ mr: 0.5, verticalAlign: 'text-bottom' }}
                    >
                      {crumb.icon}
                    </Box>
                  )}
                  {crumb.text}
                </Typography>
              );
            }

            return (
              <Link key={index} href={crumb.href} className="no-underline">
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  {crumb.icon && crumb.icon}
                  <Typography color="text.primary" fontSize="13px">
                    {crumb.text}
                  </Typography>
                </Stack>
              </Link>
            );
          })}
        </Breadcrumbs>
      )}
    </Box>
  );
}

export default function Navbar({ user }) {
  const { mode } = useTheme();
  const themeColors = useThemeColors();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const pageInfo = usePage();
  const pageTitle = pageInfo.props.title || '';
  const project = pageInfo.props.project || null;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // Tạo breadcrumbs phù hợp với trang hiện tại
  const getBreadcrumbs = () => {
    const defaultCrumbs = [
      {
        text: 'Home',
        href: route('dashboard'),
        icon: <HomeIcon fontSize="small" sx={{ fontSize: 16 }} />,
      },
    ];
    if (pageInfo.component === 'Projects/Index') {
      return [
        ...defaultCrumbs,
        {
          text: 'Projects',
          href: route('projects.index'),
          icon: <DashboardIcon fontSize="small" sx={{ fontSize: 16 }} />,
        },
      ];
    }

    if (pageInfo.component === 'Projects/Show') {
      return [
        ...defaultCrumbs,
        {
          text: 'Projects',
          href: route('projects.index'),
          icon: <DashboardIcon fontSize="small" sx={{ fontSize: 16 }} />,
        },
        {
          text: project.name,
          href: route('projects.show', project.id),
          icon: <DashboardIcon fontSize="small" sx={{ fontSize: 16 }} />,
        },
      ];
    }
    return defaultCrumbs;
  };

  return (
    <StyledAppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: mode === 'light' ? 'background.paper' : 'background.paper',
        boxShadow:
          mode === 'dark'
            ? '0 1px 3px rgba(0,0,0,0.3)'
            : '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, sm: 3, lg: 4 },
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link href={route('dashboard')}>
            <ApplicationLogo
              className={`w-20 ${mode === 'dark' ? 'fill-white' : 'fill-gray-800'}`}
            />
          </Link>
        </Box>

        <Box
          sx={{
            ml: 4,
            flexGrow: 1,
            display: { xs: 'none', md: 'block' },
          }}
        >
          <PageHeader title={project?.name} breadcrumbs={getBreadcrumbs()} />
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            gap: 2,
            ml: pageTitle ? 0 : 'auto',
          }}
        >
          <ThemeToggle />

          <IconButton
            color="inherit"
            size="medium"
            sx={{
              color: themeColors.text.secondary,
            }}
          >
            <NotificationsIcon />
          </IconButton>

          <Box>
            <Button
              color="inherit"
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
                color: themeColors.text.primary,
              }}
            >
              {user?.name || 'Guest'}
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'user-menu-button',
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                sx: {
                  bgcolor: themeColors.background.paper,
                  borderRadius: '8px',
                  boxShadow:
                    mode === 'dark'
                      ? '0 4px 20px rgba(0,0,0,0.5)'
                      : '0 4px 20px rgba(0,0,0,0.1)',
                },
              }}
            >
              <MenuItem
                onClick={handleClose}
                component={Link}
                href={route('profile.edit')}
                sx={{
                  color: themeColors.text.primary,
                  '&:hover': {
                    bgcolor: themeColors.action.hover,
                  },
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={Link}
                href={route('logout')}
                method="post"
                as="button"
                sx={{
                  color: themeColors.text.primary,
                  '&:hover': {
                    bgcolor: themeColors.action.hover,
                  },
                }}
              >
                Log Out
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>

      {/* Mobile Breadcrumbs - Chỉ hiển thị khi màn hình nhỏ */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          px: { xs: 2, sm: 3 },
          pb: 1,
        }}
      >
        <PageHeader title={pageTitle} breadcrumbs={getBreadcrumbs()} />
      </Box>
    </StyledAppBar>
  );
}
