<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;

class ProjectController extends Controller
{
    /**
     * Get all projects from DB for listing
     */
    public function index()
    {
        $projects = Project::where('is_completed', false)
            ->orderBy('created_at', 'desc')
            ->withCount(['tasks' => function ($query) {
                $query->where('is_completed', false);
            }])
            ->get();
        return $projects;
    }
    /**
     * Save data in db
     */
    public function store(Request $request)
    {
        // We are sending ajax request to post data therefore
        // If validation error occurs it will send errors in JSON in response with error code 402
        $validatedData = $request->validate([
            'name' => 'required|max:7',
            'description' => 'required'
        ]);

        // Validation passed! Insert data into db
        Project::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
        ]);

        // Send success response in JSON
        return response()->json('Project created!');
    }
    /**
     * Get Project with its task by project ID
     */
    public function show($id)
    {
        $project = Project::with(["tasks" => function ($query) {
            $query->where("is_completed", false)->orderBy("id", "desc");
        }])->find($id);

        return $project->toJson();
    }

    public function markAsCompleted(Project $project)
    {
        $project->is_completed = true;
        $project->update();

        return response()->json('Project Updated!');
    }
}
