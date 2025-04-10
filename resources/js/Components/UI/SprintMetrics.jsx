import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const SprintMetrics = ({ sprint, burndownData, velocityData }) => {
  const burndownOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sprint Burndown Chart',
      },
    },
  };

  const velocityOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Velocity Trend',
      },
    },
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-6">
        {/* Sprint Overview */}
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="mb-4 text-lg font-semibold">Sprint Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Story Points</p>
              <p className="text-2xl font-bold">{sprint.total_points}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed Points</p>
              <p className="text-2xl font-bold">{sprint.completed_points}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Days Remaining</p>
              <p className="text-2xl font-bold">{sprint.days_remaining}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Sprint Progress</p>
              <p className="text-2xl font-bold">
                {Math.round(
                  (sprint.completed_points / sprint.total_points) * 100,
                )}
                %
              </p>
            </div>
          </div>
        </div>

        {/* Team Velocity */}
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="mb-4 text-lg font-semibold">Team Velocity</h3>
          <div className="h-64">
            <Line options={velocityOptions} data={velocityData} />
          </div>
        </div>

        {/* Burndown Chart */}
        <div className="col-span-2 rounded-lg bg-white p-4 shadow">
          <h3 className="mb-4 text-lg font-semibold">Burndown Chart</h3>
          <div className="h-80">
            <Line options={burndownOptions} data={burndownData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SprintMetrics;
