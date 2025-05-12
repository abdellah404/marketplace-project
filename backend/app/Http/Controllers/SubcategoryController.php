<?php

namespace App\Http\Controllers;

use App\Models\Subcategory;
use Illuminate\Http\Request;

class SubcategoryController extends Controller
{
    public function getByCategory($categoryId)
{
    $subcategories = Subcategory::where('category_id', $categoryId)->get();
    return response()->json($subcategories);
}

}
