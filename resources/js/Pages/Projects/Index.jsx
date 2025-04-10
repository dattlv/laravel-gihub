import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Chip,
  LinearProgress,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Tooltip,
  Avatar,
  AvatarGroup,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  AccessTime as AccessTimeIcon,
  Group as GroupIcon,
  Assignment as AssignmentIcon,
  Flag as FlagIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

export default function Projects({ auth }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleMenuClick = (event, project) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedProject(project);
  };

  const handleMenuClose = e => {
    if (e) {
      e.stopPropagation();
    }
    setAnchorEl(null);
    setSelectedProject(null);
  };

  const handleFilterClick = event => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortChange = event => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = event => {
    setSortOrder(event.target.value);
  };

  // Sample data - replace with actual data from your backend
  const projects = [
    {
      id: 1,
      name: 'E-commerce Platform',
      description:
        'Building a modern e-commerce platform with React and Laravel',
      status: 'In Progress',
      progress: 65,
      tasks: 24,
      completedTasks: 16,
      priority: 'High',
      deadline: '2024-04-30',
      budget: 50000,
      budgetSpent: 32000,
      team: [
        { id: 1, name: 'John Doe', avatar: '/avatars/john.jpg' },
        { id: 2, name: 'Jane Smith', avatar: '/avatars/jane.jpg' },
        { id: 3, name: 'Mike Johnson', avatar: '/avatars/mike.jpg' },
      ],
      risks: 2,
      lastActivity: '2 hours ago',
    },
    {
      id: 2,
      name: 'Mobile App',
      description: 'Developing a cross-platform mobile application',
      status: 'Planning',
      progress: 15,
      tasks: 18,
      completedTasks: 3,
      priority: 'Medium',
      deadline: '2024-06-15',
      budget: 35000,
      budgetSpent: 5000,
      team: [
        { id: 4, name: 'Sarah Wilson', avatar: '/avatars/sarah.jpg' },
        { id: 5, name: 'Tom Brown', avatar: '/avatars/tom.jpg' },
      ],
      risks: 1,
      lastActivity: '5 hours ago',
    },
  ];

  const getStatusColor = status => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'in progress':
        return 'primary';
      case 'planning':
        return 'info';
      case 'on hold':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getPriorityColor = priority => {
    switch (priority.toLowerCase()) {
      case 'high':
        return '#ef5350';
      case 'medium':
        return '#fb8c00';
      case 'low':
        return '#66bb6a';
      default:
        return '#78909c';
    }
  };

  // Filter and sort projects
  const filteredProjects = projects
    .filter(project => {
      if (!searchQuery) return true;
      return (
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      switch (sortBy) {
        case 'name':
          return order * a.name.localeCompare(b.name);
        case 'progress':
          return order * (a.progress - b.progress);
        case 'budget':
          return order * (a.budgetSpent - b.budgetSpent);
        case 'priority':
          return order * a.priority.localeCompare(b.priority);
        default:
          return 0;
      }
    });

  // Paginate projects
  const paginatedProjects = filteredProjects.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ color: 'text.primary', mb: 1 }}
          >
            Project Management
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Overview and management of all projects
          </Typography>
        </Box>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="mx-auto ax-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
              {/* Search and Actions Bar */}
              <Box
                sx={{
                  mb: 4,
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
                    size="small"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    sx={{ width: 300 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Sort by</InputLabel>
                    <Select
                      value={sortBy}
                      label="Sort by"
                      onChange={handleSortChange}
                    >
                      <MenuItem value="name">Name</MenuItem>
                      <MenuItem value="progress">Progress</MenuItem>
                      <MenuItem value="budget">Budget</MenuItem>
                      <MenuItem value="priority">Priority</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Order</InputLabel>
                    <Select
                      value={sortOrder}
                      label="Order"
                      onChange={handleSortOrderChange}
                    >
                      <MenuItem value="asc">Ascending</MenuItem>
                      <MenuItem value="desc">Descending</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<FilterListIcon />}
                    onClick={handleFilterClick}
                  >
                    Filter
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                      background:
                        'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    }}
                  >
                    New Project
                  </Button>
                </Box>
              </Box>

              {/* Overview Stats */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      background:
                        'linear-gradient(135deg, #6B8DD6 0%, #8E37D7 100%)',
                      color: 'white',
                      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <AssignmentIcon />
                        <Typography>Active Projects</Typography>
                      </Box>
                      <Typography variant="h4">{projects.length}</Typography>
                      <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                        {
                          projects.filter(p => p.status === 'In Progress')
                            .length
                        }{' '}
                        in progress
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      background:
                        'linear-gradient(135deg, #42B8D2 0%, #3BB2B8 100%)',
                      color: 'white',
                      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <GroupIcon />
                        <Typography>Team Members</Typography>
                      </Box>
                      <Typography variant="h4">
                        {projects.reduce(
                          (acc, curr) => acc + curr.team.length,
                          0,
                        )}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                        Across all projects
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      background:
                        'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)',
                      color: 'white',
                      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <TrendingUpIcon />
                        <Typography>Total Budget</Typography>
                      </Box>
                      <Typography variant="h4">
                        $
                        {projects
                          .reduce((acc, curr) => acc + curr.budget, 0)
                          .toLocaleString()}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                        $
                        {projects
                          .reduce((acc, curr) => acc + curr.budgetSpent, 0)
                          .toLocaleString()}{' '}
                        spent
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      background:
                        'linear-gradient(135deg, #FF5858 0%, #F09819 100%)',
                      color: 'white',
                      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <WarningIcon />
                        <Typography>Risk Alerts</Typography>
                      </Box>
                      <Typography variant="h4">
                        {projects.reduce((acc, curr) => acc + curr.risks, 0)}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                        Require attention
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Projects Table */}
              <TableContainer
                component={Paper}
                sx={{
                  mt: 3,
                  boxShadow: '0 0 15px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                  '& .MuiTableCell-root': {
                    borderColor: 'rgba(224, 224, 224, 0.4)',
                  },
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Project Details</TableCell>
                      <TableCell>Team</TableCell>
                      <TableCell>Progress</TableCell>
                      <TableCell>Budget</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedProjects.map(project => (
                      <TableRow
                        key={project.id}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          },
                        }}
                      >
                        <TableCell>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 2,
                            }}
                          >
                            <Box>
                              <Link
                                href={`/projects/${project.id}`}
                                className="text-decoration-none"
                              >
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    fontWeight: 'medium',
                                    color: 'primary.main',
                                  }}
                                >
                                  {project.name}
                                </Typography>
                              </Link>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 1 }}
                              >
                                {project.description}
                              </Typography>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 2,
                                }}
                              >
                                <Tooltip title="Priority">
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: 0.5,
                                    }}
                                  >
                                    <FlagIcon
                                      sx={{
                                        fontSize: '0.9rem',
                                        color: getPriorityColor(
                                          project.priority,
                                        ),
                                      }}
                                    />
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        color: getPriorityColor(
                                          project.priority,
                                        ),
                                      }}
                                    >
                                      {project.priority}
                                    </Typography>
                                  </Box>
                                </Tooltip>
                                <Tooltip title="Deadline">
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: 0.5,
                                    }}
                                  >
                                    <AccessTimeIcon
                                      sx={{
                                        fontSize: '0.9rem',
                                        color: 'text.secondary',
                                      }}
                                    />
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      {new Date(
                                        project.deadline,
                                      ).toLocaleDateString()}
                                    </Typography>
                                  </Box>
                                </Tooltip>
                              </Box>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <AvatarGroup
                            max={3}
                            sx={{
                              '& .MuiAvatar-root': { width: 30, height: 30 },
                            }}
                          >
                            {project.team.map(member => (
                              <Tooltip key={member.id} title={member.name}>
                                <Avatar src={member.avatar} alt={member.name} />
                              </Tooltip>
                            ))}
                          </AvatarGroup>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              minWidth: 150,
                            }}
                          >
                            <Box sx={{ flexGrow: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={project.progress}
                                sx={{
                                  height: 6,
                                  borderRadius: 3,
                                  backgroundColor: 'rgba(0,0,0,0.09)',
                                  '& .MuiLinearProgress-bar': {
                                    borderRadius: 3,
                                    background:
                                      'linear-gradient(90deg, #2196F3 0%, #21CBF3 100%)',
                                  },
                                }}
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {project.progress}%
                            </Typography>
                          </Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mt: 0.5, display: 'block' }}
                          >
                            {project.completedTasks}/{project.tasks} tasks
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 'medium' }}
                          >
                            ${project.budgetSpent.toLocaleString()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            of ${project.budget.toLocaleString()}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={(project.budgetSpent / project.budget) * 100}
                            sx={{
                              mt: 1,
                              height: 4,
                              borderRadius: 2,
                              backgroundColor: 'rgba(0,0,0,0.09)',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 2,
                                background:
                                  project.budgetSpent > project.budget
                                    ? '#f44336'
                                    : '#4caf50',
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={project.status}
                            color={getStatusColor(project.status)}
                            size="small"
                            sx={{
                              borderRadius: '16px',
                              '& .MuiChip-label': { px: 2 },
                            }}
                          />
                          <Typography
                            variant="caption"
                            display="block"
                            sx={{ mt: 0.5, color: 'text.secondary' }}
                          >
                            Last activity: {project.lastActivity}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={e => handleMenuClick(e, project)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                  <TablePagination
                    component="div"
                    count={filteredProjects.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                    sx={{
                      '.MuiTablePagination-select': {
                        borderRadius: 1,
                        border: '1px solid rgba(0,0,0,0.1)',
                      },
                    }}
                  />
                </Box>
              </TableContainer>

              {/* Action Menus */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <EditIcon fontSize="small" sx={{ mr: 1 }} />
                  Edit Project
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <AssignmentIcon fontSize="small" sx={{ mr: 1 }} />
                  Manage Tasks
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <GroupIcon fontSize="small" sx={{ mr: 1 }} />
                  Manage Team
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  sx={{ color: 'error.main' }}
                >
                  <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                  Delete Project
                </MenuItem>
              </Menu>

              <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={handleFilterClose}
              >
                <MenuItem onClick={handleFilterClose}>All Projects</MenuItem>
                <MenuItem onClick={handleFilterClose}>Active Projects</MenuItem>
                <MenuItem onClick={handleFilterClose}>
                  Completed Projects
                </MenuItem>
                <MenuItem onClick={handleFilterClose}>High Priority</MenuItem>
                <MenuItem onClick={handleFilterClose}>At Risk</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
