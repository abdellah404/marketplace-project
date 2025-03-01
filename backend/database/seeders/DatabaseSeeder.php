<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Annonce;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       // Créer des catégories
       $categories = Category::factory(5)->create();

       // Créer des utilisateurs et leurs annonces
       User::factory(5)->create()->each(function ($user) use ($categories) {
           Annonce::factory(3)->create([
               'user_id' => $user->id,
               'category_id' => $categories->random()->id, // Assigner une catégorie aléatoire
           ]);
       });




    }
}
