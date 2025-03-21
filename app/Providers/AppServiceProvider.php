<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Bind repositories
        $this->app->bind(
            \App\Repositories\UserRepository::class,
            function ($app) {
                return new \App\Repositories\UserRepository(
                    new \App\Models\User()
                );
            }
        );

        // Bind services
        $this->app->bind(
            \App\Services\UserService::class,
            function ($app) {
                return new \App\Services\UserService(
                    $app->make(\App\Repositories\UserRepository::class)
                );
            }
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Create directory structure for Services and Repositories if not exists
        $directories = [
            app_path('Services'),
            app_path('Repositories'),
            app_path('Http/Requests'),
            app_path('Http/Resources'),
        ];

        foreach ($directories as $directory) {
            if (!file_exists($directory)) {
                mkdir($directory, 0755, true);
            }
        }
    }
}
