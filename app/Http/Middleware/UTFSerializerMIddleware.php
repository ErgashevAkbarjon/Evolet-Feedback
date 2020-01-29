<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Controller;
use Closure;
use Illuminate\Http\Response;

class UTFSerializerMIddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        if(
            $response instanceof Response && 
            $response->status() === 200
        ){

            return Controller::jsonUtf($response->original);
        }

        return $response;
    }
}
