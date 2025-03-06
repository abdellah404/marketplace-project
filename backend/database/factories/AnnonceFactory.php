<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Annonce>
 */
class AnnonceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
          'title' => $this->faker->sentence(4), // Generates a random title
            'description' => $this->faker->paragraph(1), // Random description
            'price' => $this->faker->randomFloat(2, 10, 1000), // Random price between 10 and 1000
            'image' => $this->faker->sentence(4),
            'city' => $this->faker->city, // Generates a random city
            'isActive' => $this->faker->boolean(80), // 80% chance of being active
            'isValidated' => $this->faker->boolean(50), // 50% chance of being validated
            'user_id' => User::factory(), // Assign a random user (creates a new one)
        ];
    }
}
