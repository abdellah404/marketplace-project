<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Category extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['name' , 'description']; // Ajoute ici les colonnes autorisées


    public function annonces() {
        return $this->hasMany(Annonce::class);
    }


    public function subcategories()
{
    return $this->hasMany(Subcategory::class);
}


}
