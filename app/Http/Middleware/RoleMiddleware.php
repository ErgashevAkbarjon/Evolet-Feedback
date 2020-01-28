<?php

namespace App\Http\Middleware;

use App\Role;
use Closure;

class RoleMiddleware
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
        $roles = $roles = array_slice(func_get_args(), 2);

        foreach ($roles as $role) {
            if($request->auth->hasRole($role)){
                return $next($request);
            }
        }
        
        return response()->json(['error' => 'Access denied'], 403);
    }
}
