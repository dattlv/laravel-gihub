<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('Projects/Index');
    }

    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    public function show(Project $project)
    {
        return Inertia::render('Projects/Show', [
            'project' => $project
        ]);
    }

    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project
        ]);
    }
}
