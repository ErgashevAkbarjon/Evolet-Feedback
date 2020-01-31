<?php

use App\Status;
use Illuminate\Database\Seeder;

class StatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Status::truncate();
        Status::create(['name' => 'На рассмотрении', 'color' => '#EBBF2F']);
        Status::create(['name' => 'Принят', 'color' => '#30D92A']);
        Status::create(['name' => 'Отклонен', 'color' => '#EB552F']);
    }
}
