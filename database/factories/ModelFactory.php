<?php

use Illuminate\Support\Facades\Hash;

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'full_name' => $faker->name,
        'email' => $faker->email,
        'password' => Hash::make('admin')
    ];
});

$factory->define(App\Customer::class, function (Faker\Generator $faker) {
    return [
        'user_id' => randomIdFrom(App\User::class),
        'pc_id' => randomIdFrom(App\PC::class),
        'bonus' => '0',
    ];
});

$factory->define(App\Employee::class, function (Faker\Generator $faker) {
    return [
        'user_id' => randomIdFrom(App\User::class),
        'avatar' => $faker->imageUrl(200,200,'cats'),
    ];
});

$factory->define(App\Feedback::class, function (Faker\Generator $faker) {
    return [
        'group_id' => randomIdFrom(App\Group::class),
        'status_id' => randomIdFrom(App\Status::class),
        'type_id' => randomIdFrom(App\FeedbackType::class),
        'customer_id' => randomIdFrom(App\Customer::class),
        'description' => $faker->text,
    ];
});

$factory->define(App\Comment::class, function (Faker\Generator $faker) {
    return [
        'body' => $faker->text,
        'employee_id' => randomIdFrom(App\Employee::class),
        'feedback_id' => randomIdFrom(App\Feedback::class)
    ];
});

$factory->define(App\File::class, function (Faker\Generator $faker){
    return [
        'name' => $faker->word,
        'url' => $faker->imageUrl(200,200,'cats'),
        'feedback_id' => randomIdFrom(App\Feedback::class)
    ];
});

/**
 * Helpers
 */

function randomIdFrom($class)
{
    $id = $class::inRandomOrder()->first()->id;
    if ($id === null) {
        $id = 0;
    }
    return $id;
}
