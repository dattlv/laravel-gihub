<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Sprint;
use App\Models\Task;
use Illuminate\Http\Request;

class SprintController extends Controller
{
    public function index()
    {
        // Mock data for testing
        $sprint = [
            'name' => 'Sprint 1',
            'start_date' => '2024-03-21',
            'end_date' => '2024-04-04',
            'status' => 'In Progress',
            'total_points' => 50,
            'completed_points' => 20,
            'days_remaining' => 10
        ];

        $tasks = [
            [
                'id' => 1,
                'title' => 'Setup Project Structure',
                'description' => 'Initialize the project with Laravel and React',
                'status' => 'done',
                'story_points' => 5,
                'assigned_to' => 'John Doe'
            ],
            [
                'id' => 2,
                'title' => 'Create Authentication System',
                'description' => 'Implement user login and registration',
                'status' => 'done',
                'story_points' => 8,
                'assigned_to' => 'Jane Smith'
            ],
            [
                'id' => 3,
                'title' => 'Design Database Schema',
                'description' => 'Create database tables and relationships',
                'status' => 'in_progress',
                'story_points' => 5,
                'assigned_to' => 'John Doe'
            ],
            [
                'id' => 4,
                'title' => 'Implement Sprint Management',
                'description' => 'Create sprint planning and tracking features',
                'status' => 'todo',
                'story_points' => 13,
                'assigned_to' => 'Jane Smith'
            ]
        ];

        // Mock data for burndown chart
        $burndownData = [
            'labels' => ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
            'datasets' => [
                [
                    'label' => 'Ideal Burndown',
                    'data' => [50, 40, 30, 20, 10],
                    'borderColor' => 'rgb(75, 192, 192)',
                    'tension' => 0.1
                ],
                [
                    'label' => 'Actual Burndown',
                    'data' => [50, 45, 35, 25, 20],
                    'borderColor' => 'rgb(255, 99, 132)',
                    'tension' => 0.1
                ]
            ]
        ];

        // Mock data for velocity chart
        $velocityData = [
            'labels' => ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4'],
            'datasets' => [
                [
                    'label' => 'Velocity',
                    'data' => [20, 25, 18, 30],
                    'borderColor' => 'rgb(53, 162, 235)',
                    'backgroundColor' => 'rgba(53, 162, 235, 0.5)',
                ]
            ]
        ];

        return Inertia::render('Sprints/Index', [
            'sprint' => $sprint,
            'tasks' => $tasks,
            'burndownData' => $burndownData,
            'velocityData' => $velocityData
        ]);
    }
}
