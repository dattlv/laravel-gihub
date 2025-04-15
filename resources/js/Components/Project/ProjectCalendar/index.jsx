import { useState, useEffect } from 'react';
import { dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Paper, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { StyledCalendar } from './styles';
import {
  CustomEventWrapper,
  CustomTimeSlotWrapper,
  CustomToolbar,
  CustomAgendaEvent,
  CustomAgendaTimeCell,
  CustomAgendaDateCell,
} from './CustomComponents';
import EventModal from './EventModal';

// Localization setup for the calendar
const locales = { 'en-US': enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function ProjectCalendar({
  events: externalEvents = [],
  onEventUpdate,
}) {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Use external events if provided, otherwise load sample events
  useEffect(() => {
    if (externalEvents.length > 0) {
      setEvents(externalEvents);
    } else {
      // Sample events for demo only
      const sampleEvents = [
        {
          id: '1',
          title: 'Sprint Planning',
          description: 'Plan the next sprint',
          priority: 'high',
          start: new Date(2024, 5, 1),
          end: new Date(2024, 5, 1),
          status: 'todo',
        },
        {
          id: '2',
          title: 'Backend Review',
          description: 'Code review for backend changes',
          priority: 'medium',
          start: new Date(2024, 5, 3),
          end: new Date(2024, 5, 3),
          status: 'inProgress',
        },
        {
          id: '3',
          title: 'Project Demo',
          description: 'Demo to stakeholders',
          priority: 'high',
          start: new Date(2024, 5, 7),
          end: new Date(2024, 5, 7),
          status: 'done',
        },
      ];
      setEvents(sampleEvents);
    }
  }, [externalEvents]);

  // Handle saving events from the modal
  const handleSaveEvent = eventData => {
    if (selectedEvent) {
      // Update existing event
      const updatedEvents = events.map(event =>
        event.id === selectedEvent.id ? eventData : event,
      );
      setEvents(updatedEvents);

      // Call parent callback if provided
      if (onEventUpdate) {
        onEventUpdate(eventData);
      }
    } else {
      // Add new event
      const newEventWithId = {
        ...eventData,
        status: 'todo', // Default new events to 'todo' column
      };

      setEvents(prevEvents => [...prevEvents, newEventWithId]);

      // Call parent callback if provided
      if (onEventUpdate) {
        onEventUpdate(newEventWithId);
      }
    }

    // Close modal
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Handle event selection
  const handleSelectEvent = event => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Handle slot selection (clicking on an empty calendar slot)
  const handleSelectSlot = () => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  // Custom event styling based on priority
  const eventStyleGetter = event => {
    let backgroundColor = '#4caf50'; // low priority (green)

    if (event.priority === 'high') {
      backgroundColor = '#f44336'; // red
    } else if (event.priority === 'medium') {
      backgroundColor = '#ff9800'; // orange
    }

    const style = {
      backgroundColor,
      borderRadius: '4px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };

    return {
      style,
    };
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <Box sx={{ px: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography fontSize="18px" fontWeight="600">
          Project Calendar
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedEvent(null);
            setIsModalOpen(true);
          }}
        >
          Add Event
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          padding: 2,
          height: 'calc(100vh - 220px)',
          minHeight: '600px',
          borderRadius: 1,
        }}
      >
        <StyledCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          eventPropGetter={eventStyleGetter}
          timeslots={1}
          step={60}
          defaultView="week"
          views={['week', 'day', 'month', 'agenda']}
          formats={{
            timeGutterFormat: date => format(date, 'HH:mm'),
            eventTimeRangeFormat: ({ start, end }) =>
              `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`,
            dayFormat: date => format(date, 'EEE dd/MM'),
          }}
          min={new Date(0, 0, 0, 8, 0)} // Start at 8:00 AM
          max={new Date(0, 0, 0, 20, 0)} // End at 8:00 PM
          dayLayoutAlgorithm="overlap"
          components={{
            toolbar: CustomToolbar,
            timeSlotWrapper: CustomTimeSlotWrapper,
            eventWrapper: CustomEventWrapper,
            // Thêm các component tùy chỉnh cho Agenda view
            agenda: {
              event: CustomAgendaEvent,
              time: CustomAgendaTimeCell,
              date: CustomAgendaDateCell,
            },
          }}
        />
      </Paper>

      {/* Use the new EventModal component */}
      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedEvent={selectedEvent}
        onSave={handleSaveEvent}
      />
    </Box>
  );
}
