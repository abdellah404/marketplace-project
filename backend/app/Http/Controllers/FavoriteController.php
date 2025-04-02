<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Auth;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    // Add to favorites

    public function addFavorite(Request $request)
    {
        $request->validate([
            'annonce_id' => 'required|exists:annonces,id',
        ]);

        // Check if the favorite already exists
        $exists = Favorite::where('user_id', Auth::id())->where('annonce_id', $request->annonce_id)->exists();

        if ($exists) {
            return response()->json(['message' => 'Already in favorites'], 409); // 409 Conflict
        }

        // Create the favorite
        Favorite::create([
            'user_id' => Auth::id(),
            'annonce_id' => $request->annonce_id,
        ]);

        return response()->json(['message' => 'Added to favorites'], 200);
    }

    // Get user's favorites
    public function getFavorites()
    {
        $favorites = Favorite::where('user_id', Auth::id())->with('annonce')->get();
        return response()->json($favorites);
    }

    // Remove from favorites
    public function removeFavorite($annonce_id) {


        $deleted = Favorite::where('user_id', Auth::id())
                           ->where('annonce_id', $annonce_id)
                           ->delete();

        if ($deleted) {
            return response()->json(['message' => 'Removed from favorites'], 200);
        }

        return response()->json(['message' => 'Favorite not found'], 404); // 404 Not Found
    }

    // is favorited
    public function isFavorited($annonce_id) {
        $isFavorited = Favorite::where('user_id', Auth::id())
                               ->where('annonce_id', $annonce_id)
                               ->exists();

        return response()->json(['data' => $isFavorited]);
    }
}
