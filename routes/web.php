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
$router->group(['prefix'=>'api', 'middleware' => 'jwt.auth'], function () use ($router){

    $router->get('feedbacks', 'FeedbackController@index');
    $router->get('feedbacks/{id}', 'FeedbackController@show');
    $router->post('feedbacks', 'FeedbackController@store');
    $router->put('feedbacks/{id}', 'FeedbackController@update');

    $router->get('groups', 'GroupController@index');

    $router->get('types', 'FeedbackTypeController@index');

    $router->get('comments', 'CommentController@index');
    $router->post('comments', 'CommentController@store');
    
    $router->get('responses', 'ResponseController@index');
    $router->post('responses', 'ResponseController@store');

});

$router->group(['prefix'=>'/'], function () use ($router){
    
    $router->post('/login', 'AuthController@authenticate');

    $router->get('/{route:.*}', function (){
        return view('app');
    });
});



