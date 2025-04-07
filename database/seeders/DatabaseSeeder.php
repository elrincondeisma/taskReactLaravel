<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        Task::create([
            'user_id' => 1,
            'title' => 'Test Task',
            'description' => 'This is a test task.',
            'status' => 'pending',
            'due_date' => now()->addDays(7),
        ]);
        Task::create([
            'user_id' => 1,
            'title' => 'Another Test Task',
            'description' => 'This is another test task.',
            'status' => 'in_progress',
            'due_date' => now()->addDays(3),
        ]);
        Task::create([
            'user_id' => 1,
            'title' => 'Completed Test Task',
            'description' => 'This is a completed test task.',
            'status' => 'completed',
            'due_date' => now()->subDays(2),
        ]);
    }
}
