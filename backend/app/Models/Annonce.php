<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Annonce extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'user_id', 'category_id', 'description', 'price', 'city', 'image', 'isActive', 'isValidated'];

    public function category()
    {
        return $this->belongsTo(Category::class, foreignKey: 'category_id');
    }

    // Annonce.php
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
