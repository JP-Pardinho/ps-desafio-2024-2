<?php

namespace Database\Factories;

use App\Models\Categories;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Books>
 */
class BooksFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->name(),
            'description' => $this->faker->lastName(),
            'price' => $this->faker->randomNumber(),
            'amount' => $this->faker->numberBetween(),
            'image' => $this->faker->imageUrl(),
            'categories_id' => Categories::inRandomOrder()->first()
        ];
    }
}
