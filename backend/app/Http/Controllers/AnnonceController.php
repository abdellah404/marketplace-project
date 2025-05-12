<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use App\Models\Favorite;
use Auth;
use Illuminate\Http\Request;
use Log;

class AnnonceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Annonce::with('user:id,name', 'category:id,name')->get();
        return response()->json([
            'data' => $data,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'city' => 'required|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('uploads', 'public');

            Annonce::create([
                'title' => $request->title,
                'description' => $request->description,
                'category_id' => $request->category_id,
                'price' => $request->price,
                'city' => $request->city,
                'isActive' => $request->isActive,
                'isValidated' => $request->isValidated,
                'user_id' => Auth::id(),
                'image' => asset('storage/' . $imagePath), // Assurez-vous que l'URL est correcte
            ]);

            return response()->json(
                [
                    'message' => 'Annonce créée avec succès',
                ],
                201,
            );
        }

        return response()->json(['message' => 'Erreur lors du téléchargement de l’image'], 400);
    }

    /**
     * Display the specified resource.
     */
    public function getAnnoncesByCategoryId($id)
    {
        $data = Annonce::where('category_id', $id)->with('user:id,name', 'category:id,name')->get();

        return response()->json([
            'data' => $data,
        ]);
    }

    //get annonce details by id
    public function getAnnonceDetails($id)
    {
        $data = Annonce::where('id', $id)->with('user:id,name', 'category:id,name')->get();

        return response()->json([
            'data' => $data,
        ]);
    }

    //get my annonces

    public function getMyAnnonces($user_id)
    {
        $data = Annonce::where('user_id', $user_id)->with('user:id,name', 'category:id,name')->get();

        return response()->json([
            'data' => $data,
            'query' => \DB::getQueryLog(), // Log the query for debugging
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Annonce $annonce)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'city' => 'required|string|max:255',
        ]);

        // Handle the image upload if a new image is provided
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($annonce->image) {
                $oldImagePath = str_replace(asset('storage/'), '', $annonce->image);
                \Storage::disk('public')->delete($oldImagePath);
            }

            // Store the new image
            $imagePath = $request->file('image')->store('uploads', 'public');
            $annonce->image = asset('storage/' . $imagePath); // Assign the new image URL
        }

        // Update the annonce with the request data
        $annonce->update([
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'price' => $request->price,
            'city' => $request->city,
        ]);

        // Save the new image URL if it was updated
        if ($request->hasFile('image')) {
            $annonce->save();
        }

        return response()->json([
            'message' => 'Annonce mise à jour avec succès',
            'data' => $annonce,
        ]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $annonce = Annonce::withTrashed()->find($id);

            if (!$annonce) {
                return response()->json(
                    [
                        'message' => 'Annonce introuvable',
                    ],
                    404,
                );
            }

            \DB::transaction(function () use ($annonce) {
                // Delete related records
                if ($annonce->favorites()->exists()) {
                    $annonce->favorites()->delete();
                }

                $deleted = $annonce->forceDelete();

                if (!$deleted) {
                    throw new \Exception('Failed to force delete annonce');
                }
            });

            return response()->json([
                'message' => 'Annonce supprimée avec succès',
                'status' => 200,
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur suppression annonce ID ' . ($id ?? 'unknown') . ': ' . $e->getMessage());

            return response()->json(
                [
                    'message' => 'Erreur lors de la suppression de l\'annonce',
                    'error' => $e->getMessage(),
                'status' => 500,
                ],
                500,
            );
        }
    }


    public function disableAnnonce($id)
    {
        try {
            $annonce = Annonce::withTrashed()->find($id);

            if (!$annonce) {
                return response()->json(
                    [
                        'message' => 'Annonce introuvable',
                    ],
                    404,
                );
            }

            \DB::transaction(function () use ($annonce) {
                // Delete related records
                if ($annonce->favorites()->exists()) {
                    $annonce->favorites()->delete();
                }

                $deleted = $annonce->delete();

                if (!$deleted) {
                    throw new \Exception('Failed to force delete annonce');
                }
            });

            return response()->json([
                'message' => 'Annonce supprimée avec succès',
                'status' => 200,
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur suppression annonce ID ' . ($id ?? 'unknown') . ': ' . $e->getMessage());

            return response()->json(
                [
                    'message' => 'Erreur lors de la suppression de l\'annonce',
                    'error' => $e->getMessage(),
                'status' => 500,

                ],
                500,
            );
        }
    }


    public function disabledAnnonces($user_id)
    {
        $data = Annonce::onlyTrashed()->where('user_id', $user_id)->with('user:id,name', 'category:id,name')->get();

        return response()->json([
            'data' => $data,
        ]);
    }
}
