<?php

namespace App\Http\Middleware;

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

        if($response instanceof Response){
            
            return response()->json(
                $request->original,
                $response->status(),
                ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],
                JSON_UNESCAPED_UNICODE
            );
        }

        return $response;
    }
}
