<?php

namespace App\Http\Middleware;

use Closure;

class FieldsLimiterMIddleware
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

        if (!$request->has('fields')){
            return $response;
        }

        $fieldsString = $request->fields;
        $fields = explode(',', $fieldsString);

        $newResponse = [];
        
        $newResponse = collect($response->original)->map(function ($item) use ($fields){
            $temp = [];

            foreach ($fields as $field) {
                $temp[$field] = $item[$field];
            }

            return $temp;
        });

        return $response->setContent($newResponse);
    }
}
