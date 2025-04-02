import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const StyledPrimaryButton = styled(Button)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: theme.spacing(1, 3),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
  fontSize: '0.875rem',
  fontWeight: 600,
  lineHeight: 1.75,
  letterSpacing: '0.02857em',
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: 'none',
  },
  '&:active': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: 'none',
  },
  '&:focus': {
    boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}));
