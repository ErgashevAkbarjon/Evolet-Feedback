<?php

use App\PC;
use Illuminate\Database\Seeder;

class PCSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PC::truncate();
        PC::create(['name' => 'Vegapharm', 'logo' => '/images/pc/vegapharm.png']);
        PC::create(['name' => 'Belinda', 'logo' => '/images/pc/belinda.png']);
        PC::create(['name' => 'Spey', 'logo' => '/images/pc/spey.png']);
        PC::create(['name' => 'Neo Universe', 'logo' => '/images/pc/neo.png']);
        PC::create(['name' => 'Lady Healthcare', 'logo' => '/images/pc/lady.png']);
    }
}
