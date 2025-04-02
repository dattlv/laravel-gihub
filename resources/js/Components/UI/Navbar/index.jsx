import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';
import {
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Divider,
  ListItemIcon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useNavbarLogic } from './useNavbar';
import { StyledAppBar, StyledToolbar } from './Navbar.styles';

export function Navbar({ onToggleSidebar }) {
  const {
    user,
    isAuthenticated,
    anchorEl,
    handleMenu,
    handleClose,
    getInitials,
    routes,
  } = useNavbarLogic();

  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onToggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          component={Link}
          href={routes.home}
          sx={{
            flexGrow: 1,
            color: 'inherit',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Laravel GitHub
        </Typography>

        {isAuthenticated && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Notifications">
              <IconButton color="inherit" size="large">
                <NotificationsIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Account settings">
              <IconButton
                onClick={handleMenu}
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                  }}
                >
                  {getInitials(user?.name)}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: { minWidth: 200 },
              }}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle1" noWrap>
                  {user?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {user?.email}
                </Typography>
              </Box>

              <Divider />

              <MenuItem
                component={Link}
                href={routes.profile}
                onClick={handleClose}
              >
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>

              <MenuItem
                component={Link}
                href={routes.settings}
                onClick={handleClose}
              >
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>

              <Divider />

              <MenuItem
                component={Link}
                href="/logout"
                method="post"
                as="button"
                onClick={handleClose}
              >
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
}

Navbar.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;
