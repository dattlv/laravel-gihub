import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Box, Tabs, Tab } from '@mui/material';
import ProjectBacklog from '@/Components/Project/ProjectBacklog';
import ProjectSprint from '@/Components/Project/ProjectBoard';
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
    <AuthenticatedLayout user={auth.user}>
      <Head title={project?.name || 'Project Details'} />
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden bg-white shadow-sm">
          <div className="py-3 px-4">
            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab
                  sx={{ fontSize: '13px', padding: '10px 15px' }}
                  label="Backlog"
                />
                <Tab
                  sx={{ fontSize: '13px', padding: '10px 15px' }}
                  label="Board"
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
    </AuthenticatedLayout>
  );
}
