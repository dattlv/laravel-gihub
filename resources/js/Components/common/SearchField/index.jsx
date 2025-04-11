import styled from 'styled-components';
import { darkTheme } from '../../../utils/theme';
import { TextField } from '@mui/material';

export const SearchField = styled(TextField)(({ mode }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 5,
    backgroundColor:
      mode === 'light' ? '#fff' : darkTheme.palette.background.subtle,
    '&:hover fieldset': {
      borderColor: '#c1c7d0',
    },
  },
  '& .MuiOutlinedInput-input:focus': {
    boxShadow: 'none',
    borderColor: 'inherit',
    '--tw-ring-shadow': 'none',
  },
  '& input[type="text"]:focus': {
    boxShadow: 'none',
    borderColor: 'inherit',
    '--tw-ring-shadow': 'none',
  },
}));
