<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Annonce;
use App\Models\Category;
use App\Models\Favorite;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

       $categories = Category::factory(3)->create();


       User::factory(10)->create()->each(function ($user) use ($categories) {
           Annonce::factory(10)->create([
               'user_id' => $user->id,
               'category_id' => $categories->random()->id, // Assigner une catégorie aléatoire
           ]);
       });

       Favorite::factory(50)->make()->each(function ($favorite) {
        Favorite::firstOrCreate([
            'user_id' => $favorite->user_id,
            'annonce_id' => $favorite->annonce_id,
        ]);
    });
    }
}
