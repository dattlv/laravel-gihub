export const ButtonStyles = ({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
  },
  '&.MuiButton-contained': {
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  '&.MuiButton-outlined': {
    borderWidth: 2,
    '&:hover': {
      borderWidth: 2,
    },
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
});
