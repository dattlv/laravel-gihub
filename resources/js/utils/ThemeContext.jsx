import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import createCustomTheme from './theme';

// Tạo context
export const ThemeContext = createContext({
  mode: 'light',
  toggleTheme: () => {},
  setMode: () => {},
});

// Context Provider
export const ThemeProvider = ({ children }) => {
  // Lấy theme từ localStorage nếu có, mặc định là light
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode ? savedMode : 'light';
  });

  // Cập nhật localStorage khi mode thay đổi
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    // Cập nhật thuộc tính color-scheme cho html root
    document.documentElement.setAttribute('data-color-scheme', mode);
  }, [mode]);

  // Hàm chuyển đổi theme
  const toggleTheme = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Tạo theme dựa trên mode hiện tại
  const theme = useMemo(() => createCustomTheme({ mode }), [mode]);

  // Context value
  const contextValue = useMemo(
    () => ({
      mode,
      toggleTheme,
      setMode,
    }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Hook để sử dụng theme trong components
export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
