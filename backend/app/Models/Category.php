<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = ['name']; // Ajoute ici les colonnes autorisées


    public function annonces() {
        return $this->hasMany(Annonce::class);
    }


}
