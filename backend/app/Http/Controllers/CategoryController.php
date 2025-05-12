<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return response()->json( $categories);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string' // Add description validation
        ]);

        try {
            $category = Category::create([
                'name' => $request->name,
                'description' => $request->description // Include description
            ]);

            return response()->json([
                'success' => true,
                'data' => $category,
                'message' => 'Category created successfully'
            ], 201); // Use 201 for created resources

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */



     public function destroy($id)
     {
         try {
             $category = Category::withTrashed()->find($id);

             if (!$category) {
                 return response()->json([
                     'message' => 'Catégorie introuvable',
                 ], 404);
             }

             \DB::transaction(function () use ($category) {
                 // Supprimer toutes les annonces associées à cette catégorie
                 foreach ($category->annonces as $annonce) {
                     if (method_exists($annonce, 'favorites')) {
                         $annonce->favorites()->delete();
                     }
                     $annonce->forceDelete();
                 }

                 // Supprimer toutes les sous-catégories associées à cette catégorie
                 foreach ($category->subcategories as $subcategory) {
                     $subcategory->forceDelete();
                 }

                 // Supprimer la catégorie définitivement
                 $deleted = $category->forceDelete();

                 if (!$deleted) {
                     throw new \Exception('Failed to force delete category');
                 }
             });

             return response()->json([
                 'message' => 'Catégorie supprimée avec succès',
                 'status' => 200,
             ]);
         } catch (\Exception $e) {
             \Log::error('Erreur suppression catégorie ID ' . ($id ?? 'unknown') . ': ' . $e->getMessage());

             return response()->json([
                 'message' => 'Erreur lors de la suppression de la catégorie',
                 'error' => $e->getMessage(),
                 'status' => 500,
             ], 500);
         }
     }


}
