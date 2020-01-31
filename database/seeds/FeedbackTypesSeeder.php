<?php

use App\FeedbackType;
use Illuminate\Database\Seeder;

class FeedbackTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        FeedbackType::truncate();
        FeedbackType::create(['name' => 'Проблема']);
        FeedbackType::create(['name' => 'Идея']);
    }
}
