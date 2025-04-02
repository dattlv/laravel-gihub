import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  IconButton,
  Chip,
  LinearProgress,
  AvatarGroup,
  Avatar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { StyledSprintCard } from './SprintBoard.styles';
import { useSprintBoard } from './useSprintBoard';

export const SprintBoard = ({ sprint: initialSprint }) => {
  const { sprint, handleEditClick, calculateProgress, getStatusColor } =
    useSprintBoard(initialSprint);

  const progress = calculateProgress();
  const statusColor = getStatusColor(sprint.status);

  return (
    <StyledSprintCard>
      <Box sx={{ p: 2 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h6" component="h3">
            {sprint.name}
          </Typography>
          <IconButton size="small" onClick={handleEditClick} sx={{ ml: 1 }}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {sprint.description}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Chip size="small" label={sprint.status} color={statusColor} />
          <Typography variant="body2" color="text.secondary">
            {sprint.startDate} - {sprint.endDate}
          </Typography>
        </Box>

        <Box mb={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="body2" color="text.secondary">
              Progress
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Math.round(progress)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            color={statusColor}
            sx={{ height: 6, borderRadius: 1 }}
          />
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <AvatarGroup
            max={4}
            sx={{ '& .MuiAvatar-root': { width: 30, height: 30 } }}
          >
            {sprint.team?.map(member => (
              <Avatar key={member.id} alt={member.name} src={member.avatar} />
            ))}
          </AvatarGroup>
          <Typography variant="body2" color="text.secondary">
            {sprint.tasks?.length || 0} tasks
          </Typography>
        </Box>
      </Box>
    </StyledSprintCard>
  );
};

SprintBoard.propTypes = {
  sprint: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.oneOf(['active', 'pending', 'completed', 'blocked'])
      .isRequired,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
      }),
    ),
    team: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
      }),
    ),
  }).isRequired,
};
