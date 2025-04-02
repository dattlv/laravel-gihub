<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProjectPolicy
{
    use HandlesAuthorization;

    /**
     * Determine if the user can manage project members.
     */
    public function manageMembers(User $user, Project $project): bool
    {
        // Project owner can manage members
        if ($project->owner_id === $user->id) {
            return true;
        }

        // Check if user is an admin member
        $member = $project->projectMembers()
            ->where('user_id', $user->id)
            ->first();

        return $member && $member->role === 'admin';
    }

    /**
     * Determine if the user can view the project.
     */
    public function view(User $user, Project $project): bool
    {
        // Project owner can view
        if ($project->owner_id === $user->id) {
            return true;
        }

        // Check if user is a member
        return $project->projectMembers()
            ->where('user_id', $user->id)
            ->exists();
    }

    /**
     * Determine if the user can update the project.
     */
    public function update(User $user, Project $project): bool
    {
        // Project owner can update
        if ($project->owner_id === $user->id) {
            return true;
        }

        // Check if user is an admin member
        $member = $project->projectMembers()
            ->where('user_id', $user->id)
            ->first();

        return $member && $member->role === 'admin';
    }

    /**
     * Determine if the user can delete the project.
     */
    public function delete(User $user, Project $project): bool
    {
        // Only project owner can delete
        return $project->owner_id === $user->id;
    }

    /**
     * Determine if the user can transfer project ownership.
     */
    public function transferOwnership(User $user, Project $project): bool
    {
        // Only project owner can transfer ownership
        return $project->owner_id === $user->id;
    }
}
