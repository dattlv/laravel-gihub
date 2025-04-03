<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Project\ProjectCategoryController;
use App\Http\Controllers\Project\ProjectController;
use App\Http\Controllers\Project\ProjectMemberController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/verify-account', [AuthController::class, 'verifyAccount'])
    ->name('api.auth.verify-account')
    ->middleware('web');

// Protected routes
Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/user', [AuthController::class, 'user'])->name('api.auth.user');

    // Project routes
    Route::prefix('v1')->name('api.v1.')->group(function () {
        Route::apiResource('projects', ProjectController::class);
        Route::apiResource('projects.members', ProjectMemberController::class);
        Route::apiResource('project-categories', ProjectCategoryController::class);

        // Project ownership transfer
        Route::put('projects/{project}/transfer-ownership', [ProjectController::class, 'transferOwnership'])
            ->name('projects.transfer-ownership');
    });
});
