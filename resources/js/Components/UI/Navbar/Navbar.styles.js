import { styled } from '@mui/material/styles';
import { AppBar, Toolbar } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: 'background.paper',
  color: 'text.primary',
  boxShadow: theme.shadows[1],
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 64,
  [theme.breakpoints.up('sm')]: {
    minHeight: 70,
  },
}));
