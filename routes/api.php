<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Project\ProjectCategoryController;
use App\Http\Controllers\Project\ProjectController;
use App\Http\Controllers\Project\ProjectMemberController;
use Illuminate\Support\Facades\Route;

Route::post('/verify-account', [AuthController::class, 'verifyAccount'])->name('api.verify-account');
Route::post('/login', [AuthController::class, 'login'])->name('api.login');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('api.logout');
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum'])->group(function () {
    // API Version 1
    Route::prefix('v1')->group(function () {
        // Projects
        Route::prefix('projects')->group(function () {
            // Project Routes
            Route::get('/', [ProjectController::class, 'index']);
            Route::post('/', [ProjectController::class, 'store']);
            Route::get('/{project}', [ProjectController::class, 'show']);
            Route::put('/{project}', [ProjectController::class, 'update']);
            Route::delete('/{project}', [ProjectController::class, 'destroy']);
            Route::patch('/{project}/archive', [ProjectController::class, 'archive']);
            Route::patch('/{project}/restore', [ProjectController::class, 'restore']);
            Route::post('/{project}/transfer-ownership', [ProjectController::class, 'transferOwnership']);

            // Project Members
            Route::get('/{project}/members', [ProjectMemberController::class, 'index']);
            Route::post('/{project}/members', [ProjectMemberController::class, 'store']);
            Route::put('/{project}/members/{userId}', [ProjectMemberController::class, 'update']);
            Route::delete('/{project}/members/{userId}', [ProjectMemberController::class, 'destroy']);
        });

        // Project Categories
        Route::prefix('categories')->group(function () {
            Route::get('/', [ProjectCategoryController::class, 'index']);
            Route::post('/', [ProjectCategoryController::class, 'store']);
            Route::get('/active', [ProjectCategoryController::class, 'active']);
            Route::get('/{category}', [ProjectCategoryController::class, 'show']);
            Route::put('/{category}', [ProjectCategoryController::class, 'update']);
            Route::delete('/{category}', [ProjectCategoryController::class, 'destroy']);
        });
    });
});
