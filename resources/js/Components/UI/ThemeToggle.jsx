import { IconButton, Tooltip } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '../../utils/ThemeContext';
import { useThemeColors } from '@/hooks/useThemeColors';

const ThemeToggle = ({ sx }) => {
  const { mode, toggleTheme } = useTheme();
  const themeColors = useThemeColors();

  return (
    <Tooltip
      title={
        mode === 'light' ? 'Chuyển sang chế độ tối' : 'Chuyển sang chế độ sáng'
      }
    >
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label="toggle theme"
        sx={{
          transition: 'all 0.3s ease',
          color: themeColors.text.secondary,
          '&:hover': {
            color: themeColors.text.primary,
            backgroundColor: themeColors.action.hover,
          },
          ...sx,
        }}
      >
        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
