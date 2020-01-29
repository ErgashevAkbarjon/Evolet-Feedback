<?php

use App\Customer;
use App\Employee;
use App\Feedback;
use App\FeedbackType;
use App\Group;
use App\PC;
use App\Role;
use App\Status;
use App\User;
use App\Comment;
use App\File;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(DevSeeder::class);
    }

}
