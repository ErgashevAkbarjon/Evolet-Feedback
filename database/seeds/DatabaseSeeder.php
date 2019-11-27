<?php

use App\Customer;
use App\Employee;
use App\Feedback;
use App\FeedbackType;
use App\Group;
use App\PC;
use App\Status;
use App\User;
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
        $this->seedStatuses();
        $this->seedFeedbackTypes();
        $this->seedGroups();
        $this->seedPC();

        $this->seedFactories([
            [
                'class' => App\User::class,
                'count' => 30,
            ],
            [
                'class' => App\Customer::class,
                'count' => 10,
            ],
            [
                'class' => App\Employee::class,
                'count' => 10,
            ],
            [
                'class' => App\Feedback::class,
                'count' => 100,
            ],
            [
                'class' => App\Comment::class,
                'count' => 100,
            ],
            [
                'class' => App\File::class,
                'count' => 100,
            ],
        ]);

        $this->seedUsers();
    }

    private function seedUsers()
    {
        $akbar = User::create([
            'full_name' => "Akbar Ergashev",
            'email' => 'e@gmail.com',
            'password' => Hash::make('admin'),
        ]);
        Employee::create([
            'user_id' => $akbar->id,
            'avatar' => 'https://lorempixel.com/200/200/cats/?41078'
        ]);
        
        $customer = User::create([
            'full_name' => 'Customer customer',
            'email' => 'c@gmail.com',
            'password' => Hash::make('admin')
        ]);
        Customer::create([
            'user_id' => $customer->id,
            'pc_id' => 1
        ]);
    }

    private function seedStatuses()
    {
        Status::truncate();
        Status::create(['name' => 'На рассмотрении', 'color' => '#EBBF2F']);
        Status::create(['name' => 'Принят', 'color' => '#30D92A']);
        Status::create(['name' => 'Отклонен', 'color' => '#EB552F']);
    }
    private function seedFeedbackTypes()
    {
        FeedbackType::truncate();
        FeedbackType::create(['name' => 'Проблема']);
        FeedbackType::create(['name' => 'Идея']);
    }
    private function seedGroups()
    {
        Group::truncate();
        Group::create(['name' => 'Упаковки']);
        Group::create(['name' => 'Инструкции']);
        Group::create(['name' => 'Сайт']);
        Group::create(['name' => 'Упаковки']);
    }
    private function seedPC()
    {
        PC::truncate();
        PC::create(['name' => 'Vegapharm', 'logo' => '/images/pc/vegapharm.png']);
        PC::create(['name' => 'Belinda', 'logo' => '/images/pc/belinda.png']);
        PC::create(['name' => 'Spey', 'logo' => '/images/pc/spey.png']);
        PC::create(['name' => 'Neo Universe', 'logo' => '/images/pc/neo.png']);
        PC::create(['name' => 'Lady Healthcare', 'logo' => '/images/pc/lady.png']);
    }

    private function seedFactories($factories)
    {
        foreach ($factories as $factory) {
            $factory['class']::truncate();
            factory($factory['class'], $factory['count'])->create();
        }
    }

}
