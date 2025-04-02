<?php

namespace App\Listeners\Project;

use App\Events\Project\ProjectCreated;
use App\Events\Project\ProjectDeleted;
use App\Events\Project\ProjectUpdated;
use App\Events\Project\MemberAdded;
use App\Events\Project\MemberRemoved;
use App\Notifications\ProjectNotification;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifyProjectMembers implements ShouldQueue
{
    /**
     * Handle project created events.
     */
    public function handleProjectCreated(ProjectCreated $event): void
    {
        $project = $event->project;
        $owner = $project->owner;

        // Notify the project owner
        $owner->notify(new ProjectNotification(
            $project,
            'created'
        ));
    }

    /**
     * Handle project updated events.
     */
    public function handleProjectUpdated(ProjectUpdated $event): void
    {
        $project = $event->project;

        // Notify all project members
        $project->members->each(function ($member) use ($project, $event) {
            $member->user->notify(new ProjectNotification(
                $project,
                'updated',
                ['changes' => $event->changes]
            ));
        });
    }

    /**
     * Handle project deleted events.
     */
    public function handleProjectDeleted(ProjectDeleted $event): void
    {
        $project = $event->project;

        // Notify all project members
        $project->members->each(function ($member) use ($project) {
            $member->user->notify(new ProjectNotification(
                $project,
                'deleted'
            ));
        });
    }

    /**
     * Handle member added events.
     */
    public function handleMemberAdded(MemberAdded $event): void
    {
        // Notify the added member
        $event->user->notify(new ProjectNotification(
            $event->project,
            'member_added',
            ['role' => $event->member->role]
        ));

        // Notify project owner
        $event->project->owner->notify(new ProjectNotification(
            $event->project,
            'member_added',
            [
                'user' => $event->user->name,
                'role' => $event->member->role
            ]
        ));
    }

    /**
     * Handle member removed events.
     */
    public function handleMemberRemoved(MemberRemoved $event): void
    {
        // Notify the removed member
        $event->user->notify(new ProjectNotification(
            $event->project,
            'member_removed'
        ));

        // Notify project owner
        $event->project->owner->notify(new ProjectNotification(
            $event->project,
            'member_removed',
            ['user' => $event->user->name]
        ));
    }
}
