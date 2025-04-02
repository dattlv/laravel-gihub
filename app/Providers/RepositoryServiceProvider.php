<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Contracts\ProjectRepository;
use App\Repositories\Eloquent\ProjectRepositoryEloquent;
use App\Repositories\Contracts\ProjectMemberRepository;
use App\Repositories\Eloquent\ProjectMemberRepositoryEloquent;
use App\Repositories\Contracts\ProjectCategoryRepository;
use App\Repositories\Eloquent\ProjectCategoryRepositoryEloquent;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(ProjectRepository::class, ProjectRepositoryEloquent::class);
        $this->app->bind(ProjectMemberRepository::class, ProjectMemberRepositoryEloquent::class);
        $this->app->bind(ProjectCategoryRepository::class, ProjectCategoryRepositoryEloquent::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
