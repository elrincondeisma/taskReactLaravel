<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TaskController;
use App\Models\Task;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::resource('tasks', TaskController::class);
    Route::patch('/tasks/{task}/toggle-complete', [TaskController::class, 'toggleComplete'])->name('task.toggle-complete');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
