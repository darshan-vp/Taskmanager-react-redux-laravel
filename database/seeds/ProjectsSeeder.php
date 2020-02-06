<?php

use Illuminate\Database\Seeder;
use App\Project;

class ProjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        for ($i = 0; $i < 20; $i++) {
            Project::create([
                'name' => $faker->word(),
                'description' => $faker->sentence,
                'is_completed' => 0
            ]);
        }
    }
}
