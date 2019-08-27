<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Exception;
use App\User;

class JWTMiddleware
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
        $token = $request->bearerToken();
        
        if(!$token){
            return response()->json([
                'eror' => "There isn't token"
            ], 400);
        }

        try {
            $credentials = JWT::decode($token, env('JWT_SECRET'), ['HS256']);
        }
        catch(ExpiredException $e){
            return response()->json([
                'error' => 'Key was expired'
            ], 400);
        }
        catch(Exception $e){
            return response()->json([
                'error' => 'An error while decoding token.'
            ], 400);
        }

        $request->auth = User::find($credentials->sub);

        return $next($request);
    }
}
