import { CircularProgress, Box, Typography, Skeleton } from '@mui/material';

/**
 * ProjectLoader - Component hiển thị trạng thái loading cho các component Project
 * Có thể tùy chỉnh nội dung và kiểu loading
 */
const ProjectLoader = ({
  variant = 'circular', // circular, skeleton, text
  message = 'Đang tải...',
  fullScreen = false,
  height = 400,
  children,
}) => {
  // Hiển thị loading toàn màn hình
  if (fullScreen) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
        }}
      >
        <CircularProgress sx={{ color: 'white' }} />
        <Typography color="white" sx={{ mt: 2 }}>
          {message}
        </Typography>
      </Box>
    );
  }

  // Các kiểu hiển thị loading
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
        width: '100%',
        position: 'relative',
      }}
    >
      {variant === 'circular' && (
        <>
          <CircularProgress />
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            {message}
          </Typography>
        </>
      )}

      {variant === 'skeleton' && children}

      {variant === 'text' && (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

// Skeleton loading templates cho các project component
ProjectLoader.Board = function BoardSkeleton() {
  return (
    <ProjectLoader variant="skeleton" height="auto">
      <Box sx={{ p: 2, width: '100%' }}>
        {/* Header Skeleton */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Skeleton variant="text" width={200} height={40} />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Skeleton
                variant="rectangular"
                width={120}
                height={36}
                sx={{ borderRadius: 1 }}
              />
              <Skeleton
                variant="rectangular"
                width={150}
                height={36}
                sx={{ borderRadius: 1 }}
              />
              <Skeleton
                variant="rectangular"
                width={40}
                height={36}
                sx={{ borderRadius: 1 }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Skeleton
                variant="rectangular"
                width={200}
                height={40}
                sx={{ borderRadius: 1 }}
              />
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} variant="circular" width={32} height={32} />
                ))}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Skeleton
                variant="rectangular"
                width={100}
                height={36}
                sx={{ borderRadius: 1 }}
              />
              <Skeleton
                variant="rectangular"
                width={130}
                height={36}
                sx={{ borderRadius: 1 }}
              />
              <Skeleton
                variant="rectangular"
                width={130}
                height={36}
                sx={{ borderRadius: 1 }}
              />
            </Box>
          </Box>
        </Box>

        {/* Columns Skeleton */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {[1, 2, 3].map(colIndex => (
            <Box
              key={colIndex}
              sx={{
                width: 280,
                borderRadius: 1,
                bgcolor: 'background.paper',
                p: 2,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
              >
                <Skeleton variant="text" width={100} height={24} />
                <Skeleton variant="circular" width={24} height={24} />
              </Box>

              {/* Cards */}
              {Array.from(new Array(3)).map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    mb: 2,
                    p: 1.5,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Skeleton variant="text" width="90%" height={24} />
                  <Skeleton
                    variant="text"
                    width="60%"
                    height={20}
                    sx={{ mb: 1 }}
                  />
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Skeleton variant="text" width={60} height={16} />
                    <Skeleton variant="circular" width={24} height={24} />
                  </Box>
                </Box>
              ))}

              <Skeleton variant="text" width={120} height={32} />
            </Box>
          ))}
        </Box>
      </Box>
    </ProjectLoader>
  );
};

ProjectLoader.Backlog = function BacklogSkeleton() {
  return (
    <ProjectLoader variant="skeleton" height="auto">
      <Box sx={{ p: 2, width: '100%' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Skeleton variant="text" width={100} height={32} />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="circular" width={32} height={32} />
            </Box>
          </Box>
          <Skeleton variant="circular" width={32} height={32} />
        </Box>

        {/* Sprints */}
        {[1, 2, 3].map(sprintIndex => (
          <Box
            key={sprintIndex}
            sx={{
              p: 1,
              mb: 2,
              borderRadius: 1,
              bgcolor: 'background.paper',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            {/* Sprint Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
              <Skeleton
                variant="circular"
                width={24}
                height={24}
                sx={{ mr: 1 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Skeleton variant="text" width={150} height={24} />
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Skeleton
                  variant="rectangular"
                  width={100}
                  height={32}
                  sx={{ borderRadius: 1 }}
                />
                <Skeleton variant="circular" width={24} height={24} />
              </Box>
            </Box>

            {/* Issues Table */}
            <Box
              sx={{ bgcolor: 'background.paper', borderRadius: 1, my: 1, p: 1 }}
            >
              {Array.from(new Array(3)).map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    py: 1,
                    borderBottom: i < 2 ? '1px solid' : 'none',
                    borderColor: 'divider',
                  }}
                >
                  <Skeleton
                    variant="circular"
                    width={20}
                    height={20}
                    sx={{ mx: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    width={60}
                    height={24}
                    sx={{ mx: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    width={200}
                    height={24}
                    sx={{ mx: 1, flexGrow: 1 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={80}
                    height={24}
                    sx={{ mx: 1, borderRadius: 1 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={60}
                    height={24}
                    sx={{ mx: 1, borderRadius: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    width={80}
                    height={24}
                    sx={{ mx: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    width={60}
                    height={24}
                    sx={{ mx: 1 }}
                  />
                  <Skeleton
                    variant="circular"
                    width={24}
                    height={24}
                    sx={{ mx: 1 }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </ProjectLoader>
  );
};

ProjectLoader.Timeline = function TimelineSkeleton() {
  return (
    <ProjectLoader variant="skeleton" height="auto">
      <Box sx={{ p: 2, width: '100%' }}>
        {/* FilterBar */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Skeleton
            variant="rectangular"
            width={250}
            height={40}
            sx={{ borderRadius: 1 }}
          />
          {[1, 2, 3].map(i => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={120}
              height={40}
              sx={{ borderRadius: 1 }}
            />
          ))}
        </Box>

        {/* Progress Tracker */}
        <Box sx={{ mb: 4, p: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Skeleton variant="text" width={150} height={32} />
            <Skeleton variant="text" width={120} height={24} />
          </Box>

          <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
            {[1, 2, 3].map(i => (
              <Box
                key={i}
                sx={{
                  flexGrow: 1,
                  p: 2,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Skeleton variant="text" width={80} height={24} />
                <Skeleton variant="text" width="40%" height={32} />
              </Box>
            ))}
          </Box>

          <Skeleton
            variant="rectangular"
            width="100%"
            height={8}
            sx={{ borderRadius: 4, mb: 1 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Skeleton variant="text" width={60} height={20} />
            <Skeleton variant="text" width={60} height={20} />
          </Box>
        </Box>

        {/* Tasks Table */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          {/* Table Header */}
          <Box
            sx={{
              display: 'flex',
              p: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.default',
            }}
          >
            {['20%', '15%', '15%', '15%', '15%', '10%', '10%'].map(
              (width, i) => (
                <Box key={i} sx={{ width }}>
                  <Skeleton variant="text" width="80%" height={24} />
                </Box>
              ),
            )}
          </Box>

          {/* Table Rows */}
          {Array.from(new Array(5)).map((_, rowIndex) => (
            <Box
              key={rowIndex}
              sx={{
                display: 'flex',
                p: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              {['20%', '15%', '15%', '15%', '15%', '10%', '10%'].map(
                (width, i) => (
                  <Box key={i} sx={{ width }}>
                    <Skeleton
                      variant="text"
                      width={i === 0 ? '90%' : '70%'}
                      height={24}
                    />
                  </Box>
                ),
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </ProjectLoader>
  );
};

export default ProjectLoader;
