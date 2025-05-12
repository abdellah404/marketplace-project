<?php

use App\Http\Controllers\AnnonceController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\SubcategoryController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)
    ->prefix('/auth')
    ->group(function () {
        Route::post('/register', 'register');
        Route::post('/login', 'login');
    });

Route::
    controller(AnnonceController::class)
    ->prefix('/annonces')
    ->group(function () {
        Route::get('/', 'index');
        Route::get('/{id}', 'getAnnoncesByCategoryId');
        Route::get('/details/{id}', 'getAnnonceDetails');
        Route::middleware('auth:sanctum')->get('/myannonces/{user_id}', 'getMyAnnonces');
        Route::middleware('auth:sanctum')->post('/', 'store');
        Route::middleware('auth:sanctum')->post('/update/{annonce}', 'update');
        Route::middleware('auth:sanctum')->delete('/delete/{id}', 'destroy');
        Route::middleware('auth:sanctum')->delete('/disable/{id}', 'disableAnnonce');
        Route::middleware('auth:sanctum')->get('/disabled/{user_id}', 'disabledAnnonces');
    });


Route::controller(CategoryController::class)

    ->prefix('/categories')

    ->group(function () {
        Route::get('/', 'index');
        Route::middleware('auth:sanctum')->delete('/{id}', 'destroy');
        Route::middleware('auth:sanctum')->post('/', 'store');
        Route::middleware('auth:sanctum')->put('/{id}', 'update');

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
    Route::get('/users', [AuthController::class, 'getUsers']);
    Route::put('/auth/update', [AuthController::class, 'update']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::delete('/users/{id}', [AuthController::class, 'deleteUser']);
    Route::post('/broadcasting/auth', function (Illuminate\Http\Request $request) {
        return Illuminate\Support\Facades\Broadcast::auth($request);
    });

});


// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/chat/messages/{receiverId}', [ChatController::class, 'getMessages']);
    Route::post('/chat/send', [ChatController::class, 'sendMessage']);
    //senders
    Route::get('/chat/senders', [ChatController::class, 'getSenders']);
    // delete message
    Route::delete('/chat/messages/{senderId}', [ChatController::class, 'deleteMessage']);


});


Route::get('/subcategories/{category_id}', [SubcategoryController::class, 'getByCategory']);




