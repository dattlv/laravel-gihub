import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const StyledInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(1.5),
  },
  '& .MuiInputLabel-root': {
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
}));
