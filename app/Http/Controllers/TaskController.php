<?php

namespace App\Http\Controllers;

use App\Http\Requests\Task\TaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Task::class, 'task');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Auth::user()->tasks()->latest()->paginate(2);
        return Inertia::render('tasks/index', [
            'tasks' => $tasks
        ]);
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('tasks/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TaskRequest $request)
    {
        //
        // dd($request->validated());
        Auth::user()->tasks()->create($request->validated());
        return to_route('tasks.index')->with('success', 'La tarea ha sido creada corréctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
        return Inertia::render('tasks/show', [
            'task' => $task
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
        return Inertia::render('tasks/edit', [
            'task' => $task
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaskRequest $request, Task $task)
    {
        //
        $task->update($request->validated());
        return to_route('tasks.index')->with('success', 'La tarea ha sido actualizada corréctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
        $task->delete();
        return to_route('tasks.index')->with('success', 'La tarea ha sido eliminada corréctamente');
    }
    public function toggleComplete(Task $task)
    {
        $this->authorize('update', $task);
        $task->status = $task->status == "completed" ? 'pending' : 'completed';
        $task->save();
        return back()->with('success', 'Estado actualizado');
    }
}
