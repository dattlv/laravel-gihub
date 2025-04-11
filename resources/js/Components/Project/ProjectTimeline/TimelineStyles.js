import { styled } from '@mui/material/styles';
import { Chip, IconButton, TableCell } from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1),
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
}));

export const StyledChip = styled(Chip)(({ theme, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'IN PROGRESS':
        return {
          bg: theme.palette.info.main,
          color: theme.palette.info.contrastText,
        };
      case 'DONE':
        return {
          bg: theme.palette.success.main,
          color: theme.palette.success.contrastText,
        };
      case 'TO DO':
        return {
          bg: theme.palette.grey[300],
          color: theme.palette.grey[900],
        };
      default:
        return {
          bg: theme.palette.grey[300],
          color: theme.palette.grey[900],
        };
    }
  };
  const colors = getStatusColor();
  return {
    backgroundColor: colors.bg,
    color: colors.color,
    fontWeight: 600,
    letterSpacing: '0.25px',
  };
});
