import Navbar from '@/Components/UI/Navbar';
import Sidebar from '@/Components/UI/Sidebar';
import { useState, useEffect } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Box } from '@mui/material';

export default function Authenticated({ header, children, user }) {
  const { mode } = useThemeColors();
  const themeColors = useThemeColors();
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const drawerWidth = isSidebarOpen ? 72 : 256;

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: mode === 'dark' ? themeColors.background.default : 'grey.100',
      }}
    >
      <Navbar
        user={user}
        showingNavigationDropdown={showingNavigationDropdown}
        setShowingNavigationDropdown={setShowingNavigationDropdown}
        isSidebarCollapsed={isSidebarOpen}
      />
      <Sidebar isCollapsed={isSidebarOpen} setIsCollapsed={setIsSidebarOpen} />
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          transition: 'width 1s ease-in-out, margin 1s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        {header && (
          <Box
            component="header"
            sx={{
              bgcolor:
                mode === 'dark'
                  ? themeColors.background.paper
                  : 'background.paper',
              transition: 'background-color 0.3s ease',
              boxShadow: 1,
              mt: '64px', // Navbar height
            }}
          >
            <Box sx={{ maxWidth: '100%', p: '16px 24px' }}>{header}</Box>
          </Box>
        )}

        {/* Page Content */}
        <Box
          sx={{
            flexGrow: 1,
            mt: header ? 0 : '64px', // If no header, add spacing from navbar
            p: { xs: 2, sm: 3 },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
