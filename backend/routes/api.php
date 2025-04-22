<?php

use App\Http\Controllers\AnnonceController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\FavoriteController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)
    ->prefix('/auth')
    ->group(function () {
        Route::post('/register', 'register');
        Route::post('/login', 'login');
    });

Route::middleware('auth:sanctum')
->prefix('/annonces')
->controller(AnnonceController::class)
    ->group(function () {

        Route::get('/', 'index');
        Route::get('/{id}', action: 'getAnnoncesByCategoryId');
        Route::get('/details/{id}', action: 'getAnnonceDetails');
        Route::get('/myannonces/{user_id}', 'getMyAnnonces');
        Route::post('/', 'store');
        Route::post('/update/{annonce}', 'update');
        Route::delete('/delete/{id}', 'destroy');

    });


Route::controller(CategoryController::class)

    ->prefix('/categories')

    ->group(function () {
        Route::get('/', 'index');
    });

   Route::middleware('auth:sanctum')
    ->prefix('/favorites')
    ->controller(FavoriteController::class)
    ->group(function () {
        Route::post('/add', 'addFavorite');
        Route::get('/get-favs', 'getFavorites');
        Route::delete('/{annonce_id}/remove', 'removeFavorite');
        Route::get('/isfavorited/{annonce_id}', 'isFavorited');
    });

// Protected routes (require valid token)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/auth/update', [AuthController::class, 'update']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/broadcasting/auth', function (Illuminate\Http\Request $request) {
        return Illuminate\Support\Facades\Broadcast::auth($request);
    });

});


// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/chat/messages/{receiverId}', [ChatController::class, 'getMessages']);
    Route::post('/chat/send', [ChatController::class, 'sendMessage']);
});
