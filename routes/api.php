<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/
Route::post('/verify-account', [AuthController::class, 'verifyAccount'])->name('api.auth.verify-account');
Route::post('/login', [AuthController::class, 'login'])->name('api.auth.login');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('api.auth.logout');
});


<<<<<<< Updated upstream
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('api.logout');
=======
Route::middleware(['auth:sanctum'])->group(function () {
    // API Version 1
    Route::prefix('v1')->name('api.v1.')->group(function () {
        // Projects
        Route::prefix('projects')->name('projects.')->group(function () {
            // Project Routes
            Route::get('/', [ProjectController::class, 'index'])->name('index');
            Route::post('/', [ProjectController::class, 'store'])->name('store');
            Route::get('/{project}', [ProjectController::class, 'show'])->name('show');
            Route::put('/{project}', [ProjectController::class, 'update'])->name('update');
            Route::delete('/{project}', [ProjectController::class, 'destroy'])->name('destroy');
            Route::patch('/{project}/archive', [ProjectController::class, 'archive'])->name('archive');
            Route::patch('/{project}/restore', [ProjectController::class, 'restore'])->name('restore');
            Route::post('/{project}/transfer-ownership', [ProjectController::class, 'transferOwnership'])->name('transfer-ownership');

            // Project Members
            Route::prefix('/{project}/members')->name('members.')->group(function () {
                Route::get('/', [ProjectMemberController::class, 'index'])->name('index');
                Route::post('/', [ProjectMemberController::class, 'store'])->name('store');
                Route::put('/{userId}', [ProjectMemberController::class, 'update'])->name('update');
                Route::delete('/{userId}', [ProjectMemberController::class, 'destroy'])->name('destroy');
            });
        });

        // Project Categories
        Route::prefix('categories')->name('categories.')->group(function () {
            Route::get('/', [ProjectCategoryController::class, 'index'])->name('index');
            Route::post('/', [ProjectCategoryController::class, 'store'])->name('store');
            Route::get('/active', [ProjectCategoryController::class, 'active'])->name('active');
            Route::get('/{category}', [ProjectCategoryController::class, 'show'])->name('show');
            Route::put('/{category}', [ProjectCategoryController::class, 'update'])->name('update');
            Route::delete('/{category}', [ProjectCategoryController::class, 'destroy'])->name('destroy');
        });
    });
>>>>>>> Stashed changes
});
