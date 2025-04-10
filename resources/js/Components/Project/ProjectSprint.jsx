import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Grid,
} from '@mui/material';

export default function ProjectSprint({ searchQuery }) {
  const sprints = [
    {
      id: 1,
      name: 'Sprint 1',
      dateRange: '14/02/2025 - 21/02/2025',
      progress: 75,
    },
    {
      id: 2,
      name: 'Sprint 2',
      dateRange: '22/02/2025 - 28/02/2025',
      progress: 50,
    },
    {
      id: 3,
      name: 'Sprint 3',
      dateRange: '01/03/2025 - 07/03/2025',
      progress: 25,
    },
  ];
  const getProgressColor = progress => {
    if (progress === 100) return 'success';
    if (progress > 50) return 'primary';
    return 'warning';
  };

  const filteredSprints = sprints.filter(sprint =>
    sprint.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Grid container spacing={3}>
      {filteredSprints.map(sprint => (
        <Grid item xs={12} md={6} lg={4} key={sprint.id}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {sprint.name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {sprint.dateRange}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={sprint.progress}
                  color={getProgressColor(sprint.progress)}
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Box
                  sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}
                >
                  <Typography variant="body2" color="textSecondary">
                    {sprint.progress}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

ProjectSprint.propTypes = {
  searchQuery: PropTypes.string,
};
