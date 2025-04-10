import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Tabs,
  Tab,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`sprint-tabpanel-${index}`}
      aria-labelledby={`sprint-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Show = ({ auth, sprint }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <Box sx={{ mb: 2 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link href={route('sprints.index')}>Sprints</Link>
            <Typography color="text.primary">{sprint.name}</Typography>
          </Breadcrumbs>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Typography variant="h4" component="h1">
              {sprint.name}
            </Typography>
            <Box>
              <button className="mr-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Edit Sprint
              </button>
              <button className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                Delete Sprint
              </button>
            </Box>
          </Box>
        </Box>
      }
    >
      <Head title={`Sprint: ${sprint.name}`} />

      <div className="py-12">
        <div className="mx-auto ax-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
              {/* Sprint Overview Cards */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={3}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Progress
                      </Typography>
                      <Typography variant="h5" component="div">
                        {Math.round(
                          (sprint.completed_points / sprint.total_points) * 100,
                        )}
                        %
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(sprint.completed_points / sprint.total_points) * 100}
                        sx={{ mt: 1 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Story Points
                      </Typography>
                      <Typography variant="h5" component="div">
                        {sprint.completed_points} / {sprint.total_points}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Days Remaining
                      </Typography>
                      <Typography variant="h5" component="div">
                        {sprint.days_remaining}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Status
                      </Typography>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          color:
                            sprint.status === 'active'
                              ? 'success.main'
                              : sprint.status === 'completed'
                                ? 'text.secondary'
                                : 'warning.main',
                        }}
                      >
                        {sprint.status.charAt(0).toUpperCase() +
                          sprint.status.slice(1)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Tabs */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="sprint tabs"
                >
                  <Tab label="Tasks" />
                  <Tab label="Burndown Chart" />
                  <Tab label="Team Members" />
                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                {/* Tasks List */}
                <div className="space-y-4">
                  {sprint.tasks?.map(task => (
                    <Card key={task.id}>
                      <CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                          }}
                        >
                          <div>
                            <Typography variant="h6">{task.title}</Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 1 }}
                            >
                              {task.description}
                            </Typography>
                          </div>
                          <Typography
                            variant="body2"
                            sx={{
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              bgcolor:
                                task.status === 'completed'
                                  ? 'success.light'
                                  : 'warning.light',
                              color:
                                task.status === 'completed'
                                  ? 'success.dark'
                                  : 'warning.dark',
                            }}
                          >
                            {task.status}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabPanel>

              <TabPanel value={value} index={1}>
                {/* Burndown Chart */}
                <Typography>Burndown chart will be displayed here</Typography>
              </TabPanel>

              <TabPanel value={value} index={2}>
                {/* Team Members */}
                <Grid container spacing={2}>
                  {sprint.team_members?.map(member => (
                    <Grid item xs={12} sm={6} md={4} key={member.id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6">{member.name}</Typography>
                          <Typography color="text.secondary">
                            {member.role}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            Assigned Tasks: {member.assigned_tasks}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

Show.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.object.isRequired,
  }).isRequired,
  sprint: PropTypes.shape({
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    completed_points: PropTypes.number.isRequired,
    total_points: PropTypes.number.isRequired,
    days_remaining: PropTypes.number.isRequired,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        status: PropTypes.string.isRequired,
      }),
    ),
    team_members: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        assigned_tasks: PropTypes.number.isRequired,
      }),
    ),
  }).isRequired,
};

export default Show;
