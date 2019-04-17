<?php

use Illuminate\Database\Seeder;
use App\Status;
use App\FeedbackType;
use App\Feedback;
use App\Group;
use App\PC;
use App\Customer;
use App\User;

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
                'count' => 10
            ],
            [
                'class' => App\Customer::class,
                'count' => 10
            ],
            [
                'class' => App\Employee::class,
                'count' => 10
            ],
            [
                'class' => App\Feedback::class,
                'count' => 100
            ],
            [
                'class' => App\Comment::class,
                'count' => 100
            ],
        ]);
    }

    private function seedStatuses()
    {
        Status::truncate();
        Status::create(['name'=> 'На рассмотрении']);
        Status::create(['name'=> 'Принят']);
        Status::create(['name'=> 'Отклонен']);
    }
    private function seedFeedbackTypes()
    {
        FeedbackType::truncate();
        FeedbackType::create(['name'=> 'Проблема']);
        FeedbackType::create(['name'=> 'Идея']);
    }
    private function seedGroups()
    {
        Group::truncate();
        Group::create(['name'=> 'Упаковки']);
        Group::create(['name'=> 'Инструкции']);
        Group::create(['name'=> 'Сайт']);
        Group::create(['name'=> 'Упаковки']);
    }
    private function seedPC()
    {
        PC::truncate();
        PC::create(['name'=> 'Vegapharm']);
        PC::create(['name'=> 'Belinda']);
        PC::create(['name'=> 'Spey']);
        PC::create(['name'=> 'Neo Universe']);
        PC::create(['name'=> 'Lady Healthcare']);
    }

    private function seedFactories($factories)
    {
        foreach ($factories as $factory) {
            $factory['class']::truncate();
            factory($factory['class'],$factory['count'])->create();
        }
    }

}
