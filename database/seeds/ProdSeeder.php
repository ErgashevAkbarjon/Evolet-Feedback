<?php

use App\Employee;
use App\Group;
use App\Role;
use App\Status;
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ProdSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RolesSeeder::class);
        $this->call(PCSeeder::class);
        $this->call(StatusesSeeder::class);
        $this->call(FeedbackTypesSeeder::class);
        $this->seedAdmin();
    }

    public function seedAdmin()
    {
        User::truncate();
        Employee::truncate();

        $adminUser = User::create([
            'full_name' => env('ADMIN_NAME'),
            'email' => env('ADMIN_EMAIL'),
            'password' => Hash::make(env('ADMIN_PASSWORD'))
        ]);

        $adminUser->roles()->attach(Role::where('name', Role::ADMIN_ROLE_NAME)->first());

        $admin = Employee::create([
            'user_id' => $adminUser->id
        ]);
    }
}
