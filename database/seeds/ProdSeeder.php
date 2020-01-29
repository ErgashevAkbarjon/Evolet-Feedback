<?php

use App\Employee;
use App\Role;
use App\User;
use Illuminate\Database\Seeder;

class ProdSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $adminUser = User::create([
            'full_name' => env('ADMIN_NAME'),
            'email' => env('ADMIN_EMAIL'),
            'password' => env('ADMIN_PASSWORD')
        ]);

        $adminUser->roles()->attach(Role::where('name', Role::ADMIN_ROLE_NAME));

        Employee::create([
            'user_id' => $adminUser->id
        ]);
    }
}
