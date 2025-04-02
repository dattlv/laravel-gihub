import { styled } from '@mui/material/styles';
import { Drawer } from '@mui/material';

const DRAWER_WIDTH = 280;

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    border: 'none',
    backgroundColor: theme.palette.background.paper,
    backgroundImage: 'none',
    boxShadow: theme.shadows[1],
  },
}));
