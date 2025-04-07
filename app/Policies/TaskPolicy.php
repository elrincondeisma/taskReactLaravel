<?php

namespace App\Policies;

use App\Models\User;

class TaskPolicy
{
    public function viewAny()
    {
        return true;
    }
    public function view(User $user, $task)
    {
        return $user->id === $task->user_id;
    }
    public function create(User $user)
    {
        return true;
    }
    public function update(User $user, $task)
    {
        return $user->id === $task->user_id;
    }
    public function delete(User $user, $task)
    {
        return $user->id === $task->user_id;
    }
}
