<?php

namespace App\Providers;

use App\Events\Project\MemberAdded;
use App\Events\Project\MemberRemoved;
use App\Events\Project\ProjectCreated;
use App\Events\Project\ProjectDeleted;
use App\Events\Project\ProjectUpdated;
use App\Listeners\Project\NotifyProjectMembers;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],

        // Project Events
        ProjectCreated::class => [
            [NotifyProjectMembers::class, 'handleProjectCreated'],
        ],
        ProjectUpdated::class => [
            [NotifyProjectMembers::class, 'handleProjectUpdated'],
        ],
        ProjectDeleted::class => [
            [NotifyProjectMembers::class, 'handleProjectDeleted'],
        ],
        MemberAdded::class => [
            [NotifyProjectMembers::class, 'handleMemberAdded'],
        ],
        MemberRemoved::class => [
            [NotifyProjectMembers::class, 'handleMemberRemoved'],
        ],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
