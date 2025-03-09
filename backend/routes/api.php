<?php

use App\Http\Controllers\AnnonceController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)
    ->prefix('/auth')
    ->group(function () {
        Route::post('/register', 'register');
        Route::post('/login', 'login');
    });

Route::controller(AnnonceController::class)
    ->prefix('/annonces')
    ->group(function () {
        Route::get('/', 'index');
        Route::get('/{id}', action: 'getAnnoncesByCategoryId');
        Route::get('/details/{id}', action: 'getAnnonceDetails');
    });

Route::controller(CategoryController::class)
    ->prefix('/categories')
    ->group(function () {
        Route::get('/', 'index');
    });

// Protected routes (require valid token)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/auth/update', [AuthController::class, 'update']);
    Route::post('/logout', [AuthController::class, 'logout']);

});
