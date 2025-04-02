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
            $imagePath = $request->file('image')->storeAs('uploads', 'annonces', 'public');

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
            'data' => $data
                ]);
    }

    //get my annonces

    public function getMyAnnonces($user_id)

    {


        $data = Annonce::where('user_id',  $user_id)->with('user:id,name', 'category:id,name')->get();

        return response()->json([
            'data' => $data,
            'query' => \DB::getQueryLog(), // Log the query for debugging

                ]);
    }



}
