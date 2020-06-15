<?php

namespace App\Http\Middleware;

use Closure;

class RedirectToSecureMiddleware
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
        if( !$request->secure() && app()->environment('production')){
            return redirect($request->getRequestUri(), 301, [], true);
        }

        return $next($request);
    }
}
