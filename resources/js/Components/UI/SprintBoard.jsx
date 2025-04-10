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
        <div className="mt-2 flex items-center">
          <div className="text-sm text-gray-600">
            {new Date(sprint.start_date).toLocaleDateString()} -{' '}
            {new Date(sprint.end_date).toLocaleDateString()}
          </div>
          <div className="ml-4 rounded bg-blue-100 px-2 py-1 text-sm text-blue-800">
            {sprint.status}
          </div>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className="rounded-lg bg-gray-100 p-4">
              <h3 className="mb-4 font-semibold">{column.title}</h3>
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
                            className="mb-2 rounded bg-white p-3 shadow-sm"
                          >
                            <div className="font-medium">{task.title}</div>
                            <div className="mt-1 text-sm text-gray-600">
                              {task.description}
                            </div>
                            <div className="mt-2 flex items-center">
                              <div className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
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
