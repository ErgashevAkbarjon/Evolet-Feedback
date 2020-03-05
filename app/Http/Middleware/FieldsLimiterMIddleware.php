<?php

namespace App\Http\Middleware;

use App\Helpers\Paginator;
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

        $fields = explode(',', $request->fields);

        $newResponse = $response->original;
        
        if($newResponse instanceof Paginator){

            return $response->setContent(
                $this->limitPaginatorData($newResponse, $fields)
            );    
        }

        $newResponse = $this->limitToFields($newResponse, $fields);

        return $response->setContent($newResponse);
    }

    /**
     * Removes all fields (keys) from $items item, except those that defined in $fields
     * 
     */
    private function limitToFields($items, $fields)
    {
        return collect($items)->map(function ($item) use ($fields){
            $temp = [];

            foreach ($fields as $field) {
                
                if(isset($item[$field])){
                    $temp[$field] = $item[$field];
                }
            }

            return $temp;
        });
    }

    /**
     * Removes all fields from Paginator data item, except those that defined in $fields
     * 
     */
    private function limitPaginatorData(Paginator $paginator, $fields)
    {
        $limitedFieldsData = $this->limitToFields(
            $paginator->getData(), 
            $fields
        );

        $paginator->setData($limitedFieldsData);

        return $paginator;
    }
}
