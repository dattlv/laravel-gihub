import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Box, Tabs, Tab, Typography, Breadcrumbs, Stack } from '@mui/material';
import {
  NavigateNext as NavigateNextIcon,
  Home as HomeIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import ProjectBacklog from '@/Components/Project/ProjectBacklog';
import ProjectSprint from '@/Components/Project/ProjectSprint';
import ProjectTimeline from '@/Components/Project/ProjectTimeline';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`project-tabpanel-${index}`}
      aria-labelledby={`project-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Show({ auth, project }) {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery] = useState('');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            {project?.name || 'Project Details'}
          </h2>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ fontSize: '13px' }}
          >
            <Link href="/dashboard" className="no-underline">
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <HomeIcon fontSize="small" sx={{ fontSize: 16 }} />
                <Typography color="text.primary" fontSize="13px">
                  Home
                </Typography>
              </Stack>
            </Link>
            <Link href="/projects" className="no-underline">
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <DashboardIcon fontSize="small" sx={{ fontSize: 16 }} />
                <Typography color="text.primary" fontSize="13px">
                  Projects
                </Typography>
              </Stack>
            </Link>
            <Typography color="text.secondary" fontSize="13px">
              {project?.name || 'Project Details'}
            </Typography>
          </Breadcrumbs>
        </div>
      }
    >
      <Head title={project?.name || 'Project Details'} />

      <div className="py-12">
        <div className="mx-auto ax-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
              {/* Tabs */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={handleTabChange}>
                  <Tab
                    sx={{ fontSize: '13px', padding: '10px 15px' }}
                    label="Backlog"
                  />
                  <Tab
                    sx={{ fontSize: '13px', padding: '10px 15px' }}
                    label="Sprint"
                  />
                  <Tab
                    sx={{ fontSize: '13px', padding: '10px 15px' }}
                    label="Timeline"
                  />
                </Tabs>
              </Box>

              {/* Tab Panels */}
              <TabPanel value={activeTab} index={0}>
                <ProjectBacklog searchQuery={searchQuery} />
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                <ProjectSprint searchQuery={searchQuery} />
              </TabPanel>
              <TabPanel value={activeTab} index={2}>
                <ProjectTimeline searchQuery={searchQuery} />
              </TabPanel>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
