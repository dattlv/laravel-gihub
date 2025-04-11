import { useTheme } from '../utils/ThemeContext';

/**
 * Hook to get theme-aware colors for use in components
 * Simplifies accessing the right color based on current theme
 */
export const useThemeColors = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return {
    mode,
    // Background colors
    background: {
      default: isDark ? '#0f172a' : '#f9fafb',
      paper: isDark ? '#1f2937' : '#ffffff',
      subtle: isDark ? '#374151' : '#f3f4f6',
      sidebar: isDark ? '#111827' : '#1f2937',
    },
    // Text colors
    text: {
      primary: isDark ? '#f9fafb' : '#111827',
      secondary: isDark ? '#d1d5db' : '#6b7280',
      disabled: isDark ? '#9ca3af' : '#d1d5db',
      hint: isDark ? '#9ca3af' : '#9ca3af',
    },
    // Border colors
    border: {
      light: isDark ? '#374151' : '#f3f4f6',
      main: isDark ? '#4b5563' : '#e5e7eb',
      dark: isDark ? '#6b7280' : '#d1d5db',
    },
    // Other UI element colors
    divider: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
    action: {
      active: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.54)',
      hover: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)',
      selected: isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)',
      disabled: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.26)',
      disabledBackground: isDark
        ? 'rgba(255, 255, 255, 0.12)'
        : 'rgba(0, 0, 0, 0.12)',
    },
    // Notoria specific brand colors for both themes
    brand: {
      primary: '#2563EB',
      secondary: '#7C3AED',
      success: '#22C55E',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },
  };
};

export default useThemeColors;
