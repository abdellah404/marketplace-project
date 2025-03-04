<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Annonce extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'price',
        'location',
        'image',
        'isActive',
        'isValidated'
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }

}
