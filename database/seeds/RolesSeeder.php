<?php

use App\Role;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::truncate();
        Role::create(['name' => Role::ADMIN_ROLE_NAME]);
        Role::create(['name' => Role::EMPLOYEE_ROLE_NAME]);
        Role::create(['name' => Role::CUSTOMER_ROLE_NAME]);
    }
}
