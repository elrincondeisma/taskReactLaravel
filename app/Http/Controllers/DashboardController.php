<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        //
        $user = Auth::user();
        $tasksStats = [
            'total' => $user->tasks()->count(),
            'completed' => $user->tasks()->where('status', 'completed')->count(),
            'pending' => $user->tasks()->where('status', '!=', 'completed')->count(),
            'upcoming' => $user->tasks()->where('status', '!=', 'completed')
                ->whereNotNull('due_date')
                ->where('due_date', '>', now())
                ->orderBy('due_date')
                ->limit(5)
                ->get(),
        ];
        $completionRate = $tasksStats['total'] > 0 ? round(($tasksStats['completed'] / $tasksStats['total']) * 100) : 0;
        return Inertia::render('dashboard', [
            'tasksStats' => $tasksStats,
            'completionRate' => $completionRate,
        ]);
    }
}
