import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { SearchField } from '../../common/SearchField';
import { TASK_STATUSES, SPRINT_OPTIONS } from './mockData';

const FilterBar = ({
  mode,
  status,
  setStatus,
  sprint,
  setSprint,
  type,
  setType,
  setSearchQuery,
}) => (
  <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
    <SearchField
      placeholder="Search"
      size="small"
      sx={{ width: 200 }}
      mode={mode}
      onChange={e => setSearchQuery(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <Select
        value={status}
        onChange={e => setStatus(e.target.value)}
        displayEmpty
        sx={{ fontSize: '14px' }}
      >
        <MenuItem value="" sx={{ fontSize: '14px' }}>
          All Status
        </MenuItem>
        <MenuItem value={TASK_STATUSES.TODO} sx={{ fontSize: '14px' }}>
          To Do
        </MenuItem>
        <MenuItem value={TASK_STATUSES.IN_PROGRESS} sx={{ fontSize: '14px' }}>
          In Progress
        </MenuItem>
        <MenuItem value={TASK_STATUSES.DONE} sx={{ fontSize: '14px' }}>
          Done
        </MenuItem>
      </Select>
    </FormControl>

    <FormControl size="small" sx={{ minWidth: 120 }}>
      <Select
        value={sprint}
        onChange={e => setSprint(e.target.value)}
        displayEmpty
        sx={{ fontSize: '14px' }}
      >
        <MenuItem value="" sx={{ fontSize: '14px' }}>
          All Sprints
        </MenuItem>
        {SPRINT_OPTIONS.map(sprintOption => (
          <MenuItem
            key={sprintOption}
            value={sprintOption}
            sx={{ fontSize: '14px' }}
          >
            {sprintOption}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    <FormControl size="small" sx={{ minWidth: 120 }}>
      <Select
        value={type}
        onChange={e => setType(e.target.value)}
        displayEmpty
        sx={{ fontSize: '14px' }}
      >
        <MenuItem value="" sx={{ fontSize: '14px' }}>
          All Types
        </MenuItem>
        <MenuItem value="Task" sx={{ fontSize: '14px' }}>
          Task
        </MenuItem>
        <MenuItem value="Note" sx={{ fontSize: '14px' }}>
          Note
        </MenuItem>
      </Select>
    </FormControl>
  </Box>
);

FilterBar.propTypes = {
  mode: PropTypes.object,
  status: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired,
  sprint: PropTypes.string.isRequired,
  setSprint: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  setType: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default FilterBar;
