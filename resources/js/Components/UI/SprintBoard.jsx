import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const SprintBoard = ({ sprint, tasks, onTaskMove }) => {
  const columns = {
    todo: {
      title: 'To Do',
      items: tasks.filter(task => task.status === 'todo'),
    },
    inProgress: {
      title: 'In Progress',
      items: tasks.filter(task => task.status === 'in_progress'),
    },
    review: {
      title: 'Review',
      items: tasks.filter(task => task.status === 'review'),
    },
    done: {
      title: 'Done',
      items: tasks.filter(task => task.status === 'done'),
    },
  };

  const onDragEnd = result => {
    if (!result.destination) return;

    const { source, destination } = result;
    onTaskMove(result.draggableId, source.droppableId, destination.droppableId);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">{sprint.name}</h2>
        <div className="flex items-center mt-2">
          <div className="text-sm text-gray-600">
            {new Date(sprint.start_date).toLocaleDateString()} -{' '}
            {new Date(sprint.end_date).toLocaleDateString()}
          </div>
          <div className="ml-4 px-2 py-1 rounded bg-blue-100 text-blue-800 text-sm">
            {sprint.status}
          </div>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-4">{column.title}</h3>
              <Droppable droppableId={columnId}>
                {provided => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[500px]"
                  >
                    {column.items.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {provided => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-3 rounded mb-2 shadow-sm"
                          >
                            <div className="font-medium">{task.title}</div>
                            <div className="text-sm text-gray-600 mt-1">
                              {task.description}
                            </div>
                            <div className="flex items-center mt-2">
                              <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {task.story_points} pts
                              </div>
                              {task.assigned_to && (
                                <div className="ml-2 text-xs text-gray-500">
                                  Assigned to: {task.assigned_to}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default SprintBoard;
