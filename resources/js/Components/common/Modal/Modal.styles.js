import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(3),
  fontSize: '1.25rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  '&:first-of-type': {
    paddingTop: theme.spacing(3),
  },
}));
