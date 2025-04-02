import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigation } from '../../../hooks/useNavigation';
import { navigationMenu } from '../../../config/routes';
import { useSidebarLogic } from './useSidebar';
import { StyledDrawer } from './Sidebar.styles';

export function Sidebar({ open, onClose }) {
  const { isActive } = useNavigation();
  const { openMenus, handleMenuClick, getIcon } = useSidebarLogic();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const renderMenuItem = (item, index) => {
    const hasChildren = item.children && item.children.length > 0;
    const isMenuOpen = openMenus[item.path] || false;
    const active = isActive(item.path);

    return (
      <React.Fragment key={item.path}>
        <ListItem disablePadding>
          <ListItemButton
            component={hasChildren ? 'div' : Link}
            href={hasChildren ? undefined : item.path}
            onClick={hasChildren ? () => handleMenuClick(item.path) : undefined}
            selected={active}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
                '& .MuiListItemIcon-root': {
                  color: 'primary.contrastText',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {getIcon(item.icon)}
            </ListItemIcon>
            <ListItemText primary={item.title} />
            {hasChildren && (isMenuOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>

        {hasChildren && (
          <Collapse in={isMenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map(child => (
                <ListItemButton
                  key={child.path}
                  component={Link}
                  href={child.path}
                  selected={isActive(child.path)}
                  sx={{
                    pl: 4,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {getIcon(child.icon)}
                  </ListItemIcon>
                  <ListItemText primary={child.title} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        )}

        {index < navigationMenu.length - 1 && !hasChildren && (
          <Divider sx={{ my: 1 }} />
        )}
      </React.Fragment>
    );
  };

  return (
    <StyledDrawer
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Box sx={{ overflow: 'auto', mt: 8 }}>
        <List component="nav">
          {navigationMenu.map((item, index) => renderMenuItem(item, index))}
        </List>
      </Box>
    </StyledDrawer>
  );
}

Sidebar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
