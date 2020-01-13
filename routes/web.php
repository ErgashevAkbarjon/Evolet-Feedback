<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
$router->group(['prefix'=>'api', 'middleware' => ['jwt.auth', 'utf.serializer', 'api.fields_limiter']], function () use ($router){
    
    $router->get('feedbacks', 'FeedbackController@index');
    $router->get('feedbacks/{id}', 'FeedbackController@show');
    $router->post('feedbacks', 'FeedbackController@store');
    $router->put('feedbacks/{id}', 'FeedbackController@update');

    $router->get('groups', 'GroupController@index');
    $router->post('groups', 'GroupController@store');
    $router->get('groups/{id}', 'GroupController@show');
    $router->put('groups/{id}', 'GroupController@update');
    $router->delete('groups/{id}', 'GroupController@destroy');

    $router->get('types', 'FeedbackTypeController@index');

    $router->get('comments', 'CommentController@index');
    $router->post('comments', 'CommentController@store');
    
    $router->get('responses', 'ResponseController@index');
    $router->post('responses', 'ResponseController@store');

    $router->get('customers', 'CustomerController@index');
    $router->post('customers', 'CustomerController@store');
    $router->put('customers/{id}', 'CustomerController@update');
    $router->delete('customers/{id}', 'CustomerController@destroy');
    
    $router->get('employees', 'EmployeeController@index');
    $router->post('employees', 'EmployeeController@store');
    $router->put('employees/{id}', 'EmployeeController@update');
    $router->delete('employees/{id}', 'EmployeeController@destroy');
    
    $router->get('pc', 'PCController@index');
});

$router->group(['prefix'=>'/'], function () use ($router){
    
    $router->post('/login', 'AuthController@authenticate');

    $router->get('/password/reset/{token}', 'AuthController@showPasswordReset');
    $router->post('/password/reset/{token}', 'AuthController@passwordReset');

    $router->get('/{route:.*}', function (){
        return view('app');
    });
});



