/* eslint-disable indent */
import { useState, useEffect } from 'react';
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
  Tooltip,
  Avatar,
  AvatarGroup,
  TablePagination,
  Skeleton,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
  AccessTime as AccessTimeIcon,
  Group as GroupIcon,
  Assignment as AssignmentIcon,
  Flag as FlagIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { useTheme } from '../../utils/ThemeContext';
import { projects } from '../../utils/constants';
import { getPriorityColor, getStatusColor } from '../../utils/helpers';
import FilterBar from '@/Components/common/FilterSelect';

export default function Projects({ auth }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('');
  const [sprint, setSprint] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy] = useState('name');
  const [sortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [projectsData, setProjectsData] = useState([]);
  const { mode } = useTheme();
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

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setProjectsData(projects);
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProjects = loading
    ? []
    : projectsData
        .filter(project => {
          if (!searchQuery) return true;
          return (
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
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

  const filters = [
    {
      name: 'Sort by',
      value: status,
      onChange: e => setStatus(e.target.value),
      options: [
        { value: 'name', label: 'Name' },
        { value: 'progress', label: 'Progress' },
        { value: 'budget', label: 'Budget' },
      ],
    },
    {
      name: 'Order',
      value: sprint,
      onChange: e => setSprint(e.target.value),
      options: [
        { value: 'asc', label: 'Ascending' },
        { value: 'des', label: 'Descending' },
      ],
    },
  ];

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Projects" />
      <div className="">
        <div className="mx-auto p-0">
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
                  <FilterBar
                    searchProps={{
                      placeholder: 'Tìm kiếm ...',
                      width: 250,
                      onChange: e => setSearchQuery(e.target.value),
                    }}
                    filters={filters}
                    spacing={2}
                    mode={mode}
                  />
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
                {loading ? (
                  // Skeleton loading cho các card thống kê
                  <>
                    {[1, 2, 3, 4].map(item => (
                      <Grid item xs={12} sm={6} md={3} key={item}>
                        <Card
                          sx={{ boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' }}
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
                              <Skeleton
                                variant="circular"
                                width={24}
                                height={24}
                              />
                              <Skeleton
                                variant="text"
                                width={120}
                                height={24}
                              />
                            </Box>
                            <Skeleton
                              variant="rectangular"
                              width="60%"
                              height={32}
                            />
                            <Skeleton
                              variant="text"
                              width="40%"
                              height={20}
                              sx={{ mt: 1 }}
                            />
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </>
                ) : (
                  // Nội dung thực khi đã tải xong
                  <>
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
                          <Typography variant="h4">
                            {projectsData.length}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ mt: 1, opacity: 0.8 }}
                          >
                            {
                              projectsData.filter(
                                p => p.status === 'In Progress',
                              ).length
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
                            {projectsData.reduce(
                              (acc, curr) => acc + curr.team.length,
                              0,
                            )}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ mt: 1, opacity: 0.8 }}
                          >
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
                            {projectsData
                              .reduce((acc, curr) => acc + curr.budget, 0)
                              .toLocaleString()}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ mt: 1, opacity: 0.8 }}
                          >
                            $
                            {projectsData
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
                            {projectsData.reduce(
                              (acc, curr) => acc + curr.risks,
                              0,
                            )}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ mt: 1, opacity: 0.8 }}
                          >
                            Require attention
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </>
                )}
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
                    {loading ? (
                      // Skeleton loading cho bảng dự án
                      Array.from(new Array(5)).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 2,
                              }}
                            >
                              <Box sx={{ width: '100%' }}>
                                <Skeleton
                                  variant="text"
                                  width="60%"
                                  height={24}
                                />
                                <Skeleton
                                  variant="text"
                                  width="80%"
                                  height={20}
                                  sx={{ my: 1 }}
                                />
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                  <Skeleton
                                    variant="text"
                                    width={80}
                                    height={16}
                                  />
                                  <Skeleton
                                    variant="text"
                                    width={120}
                                    height={16}
                                  />
                                </Box>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              {Array.from(new Array(3)).map((_, i) => (
                                <Skeleton
                                  key={i}
                                  variant="circular"
                                  width={30}
                                  height={30}
                                />
                              ))}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Skeleton
                              variant="rectangular"
                              width="100%"
                              height={6}
                              sx={{ borderRadius: 3 }}
                            />
                            <Skeleton
                              variant="text"
                              width="40%"
                              height={16}
                              sx={{ mt: 1 }}
                            />
                          </TableCell>
                          <TableCell>
                            <Skeleton variant="text" width="60%" height={20} />
                            <Skeleton variant="text" width="40%" height={16} />
                            <Skeleton
                              variant="rectangular"
                              width="100%"
                              height={4}
                              sx={{ borderRadius: 2, mt: 1 }}
                            />
                          </TableCell>
                          <TableCell>
                            <Skeleton
                              variant="rectangular"
                              width={80}
                              height={24}
                              sx={{ borderRadius: 16 }}
                            />
                            <Skeleton
                              variant="text"
                              width="80%"
                              height={16}
                              sx={{ mt: 1 }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Skeleton
                              variant="circular"
                              width={30}
                              height={30}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : paginatedProjects.length > 0 ? (
                      // Nội dung dự án khi đã tải xong
                      paginatedProjects.map(project => (
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
                                  <Avatar
                                    src={member.avatar}
                                    alt={member.name}
                                  />
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
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
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
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              of ${project.budget.toLocaleString()}
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={
                                (project.budgetSpent / project.budget) * 100
                              }
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
                      ))
                    ) : (
                      // Hiển thị khi không có dữ liệu
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Box sx={{ py: 3 }}>
                            <Typography variant="body1" color="text.secondary">
                              No projects found
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                  {loading ? (
                    <Skeleton variant="rectangular" width={300} height={40} />
                  ) : (
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
                  )}
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
