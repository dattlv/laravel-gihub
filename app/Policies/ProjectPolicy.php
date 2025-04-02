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
}
