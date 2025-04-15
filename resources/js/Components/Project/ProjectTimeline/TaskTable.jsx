import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { StyledTableCell } from './TimelineStyles';
import TaskRow from './TaskRow';

// Import the same column width configuration used in TaskRow
const COLUMN_WIDTHS = {
  child: '3%',
  type: '4%',
  id: '7%',
  name: '25%',
  status: '10%',
  startDate: '10%',
  dueDate: '10%',
  priority: '7%',
  parent: '8%',
  sprint: '16%',
};

const TaskTable = ({
  filteredTasks,
  expandedRows,
  toggleRowExpanded,
  allTasks,
}) => (
  <TableContainer>
    <Table size="small" sx={{ tableLayout: 'fixed' }}>
      <TableHead>
        <TableRow>
          <StyledTableCell width={COLUMN_WIDTHS.child} />
          <StyledTableCell width={COLUMN_WIDTHS.type}>Type</StyledTableCell>
          <StyledTableCell width={COLUMN_WIDTHS.id}>Key</StyledTableCell>
          <StyledTableCell width={COLUMN_WIDTHS.name}>Name</StyledTableCell>
          <StyledTableCell width={COLUMN_WIDTHS.status}>Status</StyledTableCell>
          <StyledTableCell width={COLUMN_WIDTHS.startDate}>
            Start Date
          </StyledTableCell>
          <StyledTableCell width={COLUMN_WIDTHS.dueDate}>
            Due Date
          </StyledTableCell>
          <StyledTableCell width={COLUMN_WIDTHS.priority}>
            Priority
          </StyledTableCell>
          <StyledTableCell width={COLUMN_WIDTHS.parent}>Parent</StyledTableCell>
          <StyledTableCell width={COLUMN_WIDTHS.sprint}>Sprint</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredTasks.map(task => (
          <TaskRow
            key={task.id}
            task={task}
            expandedRows={expandedRows}
            toggleRowExpanded={toggleRowExpanded}
            childTasks={allTasks.filter(
              childTask => childTask.parent === task.id,
            )}
          />
        ))}
        {filteredTasks.length === 0 && (
          <TableRow>
            <StyledTableCell colSpan={11} align="center">
              <Typography variant="body2" sx={{ py: 2 }}>
                No tasks match your search criteria
              </Typography>
            </StyledTableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

TaskTable.propTypes = {
  filteredTasks: PropTypes.array.isRequired,
  expandedRows: PropTypes.object.isRequired,
  toggleRowExpanded: PropTypes.func.isRequired,
  allTasks: PropTypes.array.isRequired,
};

export default TaskTable;
