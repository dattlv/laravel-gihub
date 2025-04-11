import { Box, Typography, Badge } from '@mui/material';
import PropTypes from 'prop-types';

const ProgressTracker = ({
  todoCount,
  inProgressCount,
  doneCount,
  totalTasks,
}) => {
  const progressPercentage = Math.round((doneCount / totalTasks) * 100) || 0;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Badge badgeContent={todoCount} color="secondary" />
        <Badge badgeContent={inProgressCount} color="primary" />
        <Badge badgeContent={doneCount} color="success" />
      </Box>

      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: 'grey.200',
            borderRadius: 1,
            height: 8,
          }}
        >
          <Box
            sx={{
              width: `${progressPercentage}%`,
              bgcolor: 'success.main',
              height: '100%',
              borderRadius: 1,
              transition: 'width 0.3s ease-in-out',
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {progressPercentage}% Complete
        </Typography>
      </Box>
    </Box>
  );
};

ProgressTracker.propTypes = {
  todoCount: PropTypes.number.isRequired,
  inProgressCount: PropTypes.number.isRequired,
  doneCount: PropTypes.number.isRequired,
  totalTasks: PropTypes.number.isRequired,
};

export default ProgressTracker;
