import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// Import date picker components
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const EventModal = ({ isOpen, onClose, selectedEvent, onSave }) => {
  const [newEvent, setNewEvent] = useState({
    id: '',
    title: '',
    description: '',
    priority: 'medium',
    start: new Date(),
    end: new Date(),
    status: 'todo',
  });

  // Reset form when selectedEvent changes or modal opens/closes
  useEffect(() => {
    if (selectedEvent) {
      setNewEvent({
        id: selectedEvent.id,
        title: selectedEvent.title,
        description: selectedEvent.description || '',
        priority: selectedEvent.priority,
        start: selectedEvent.start,
        end: selectedEvent.end,
        status: selectedEvent.status || 'todo',
      });
    } else {
      setNewEvent({
        id: '',
        title: '',
        description: '',
        priority: 'medium',
        start: new Date(),
        end: new Date(),
        status: 'todo',
      });
    }
  }, [selectedEvent, isOpen]);

  // Handle form submission
  const handleSubmit = () => {
    const eventToSave = {
      ...newEvent,
      id: newEvent.id || Math.random().toString(36).substr(2, 9),
    };

    onSave(eventToSave);
  };

  // Render status field for existing events
  const renderStatusField = () => {
    if (!selectedEvent) return null;

    return (
      <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={newEvent.status || 'todo'}
          onChange={e => setNewEvent({ ...newEvent, status: e.target.value })}
          label="Status"
          sx={{ borderRadius: 1.5 }}
          MenuProps={{
            PaperProps: {
              sx: { borderRadius: 1.5, mt: 0.5 },
            },
          }}
        >
          <MenuItem value="todo">To Do</MenuItem>
          <MenuItem value="inProgress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </Select>
      </FormControl>
    );
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="event-form-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: '90vh',
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            pb: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            {selectedEvent ? 'Edit Event' : 'Add New Event'}
          </Typography>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              bgcolor: 'action.hover',
              '&:hover': { bgcolor: 'action.selected' },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          label="Title"
          value={newEvent.title}
          onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
          margin="normal"
          required
          variant="outlined"
          sx={{ mb: 2 }}
          InputProps={{
            sx: { borderRadius: 1.5 },
          }}
        />

        <TextField
          fullWidth
          label="Description"
          multiline
          rows={3}
          value={newEvent.description}
          onChange={e =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
          margin="normal"
          variant="outlined"
          sx={{ mb: 2 }}
          InputProps={{
            sx: { borderRadius: 1.5 },
          }}
        />

        <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={newEvent.priority}
            onChange={e =>
              setNewEvent({ ...newEvent, priority: e.target.value })
            }
            label="Priority"
            sx={{ borderRadius: 1.5 }}
            MenuProps={{
              PaperProps: {
                sx: { borderRadius: 1.5, mt: 0.5 },
              },
            }}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>

        {/* Render status field for existing events */}
        {renderStatusField()}

        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, mt: 2 }}>
          Date & Time
        </Typography>

        {/* Date & Time Pickers using MUI DateTimePicker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ mb: 3 }}>
            <DateTimePicker
              label="Start Date & Time"
              value={dayjs(newEvent.start)}
              onChange={date => {
                if (date) {
                  setNewEvent({
                    ...newEvent,
                    start: date.toDate(),
                  });
                }
              }}
              sx={{ width: '100%', mb: 2 }}
              format="DD/MM/YYYY HH:mm"
              ampm={false}
              slotProps={{
                textField: {
                  variant: 'outlined',
                  InputProps: {
                    sx: { borderRadius: 1.5 },
                  },
                },
              }}
            />

            <DateTimePicker
              label="End Date & Time"
              value={dayjs(newEvent.end)}
              onChange={date => {
                if (date) {
                  setNewEvent({
                    ...newEvent,
                    end: date.toDate(),
                  });
                }
              }}
              sx={{ width: '100%' }}
              format="DD/MM/YYYY HH:mm"
              ampm={false}
              slotProps={{
                textField: {
                  variant: 'outlined',
                  InputProps: {
                    sx: { borderRadius: 1.5 },
                  },
                },
              }}
            />
          </Box>
        </LocalizationProvider>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderRadius: 2,
              px: 3,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!newEvent.title}
            color="primary"
            sx={{
              borderRadius: 2,
              px: 3,
              boxShadow: 2,
            }}
          >
            {selectedEvent ? 'Update Event' : 'Add Event'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EventModal;
