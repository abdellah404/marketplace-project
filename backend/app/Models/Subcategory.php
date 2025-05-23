<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'category_id']; // Ajoute ici les colonnes autorisées


    public function category()
{
    return $this->belongsTo(Category::class);
}



}
