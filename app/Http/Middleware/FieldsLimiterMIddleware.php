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

        if (!$request->has('fields')) {
            return $response;
        }

        $fields = explode(',', $request->fields);

        $newResponse = $response->original;

        if ($newResponse instanceof Paginator) {

            return $response->setContent(
                $this->limitPaginatorData($newResponse, $fields)
            );
        }

        if (is_iterable($newResponse)) {

            return $response->setContent(
                $this->limitEachToFields($newResponse, $fields)
            );
        }

        return $response->setContent(
            $this->limitToFields($newResponse, $fields)
        );
    }

    /**
     * Removes all fields (keys) from $item, except those that defined in $fields
     *
     */
    private function limitToFields($item, $fields)
    {
        $temp = [];

        foreach ($fields as $field) {

            if (isset($item[$field])) {
                $temp[$field] = $item[$field];
            }
        }

        return $temp;
    }

    /**
     * Removes all fields (keys) that didn't defined in $fields from every item of $items
     *
     */
    private function limitEachToFields($items, $fields)
    {
        if (!is_iterable($items)) {
            return $items;
        }

        return collect($items)->map(function ($item) use ($fields) {
            return $this->limitToFields($item, $fields);
        });
    }

    /**
     * Removes all fields from Paginator data item, except those that defined in $fields
     *
     */
    private function limitPaginatorData(Paginator $paginator, $fields)
    {
        $paginatorData = $paginator->getData();

        $limitedFieldsData = $this->limitEachToFields($paginatorData, $fields);

        $paginator->setData($limitedFieldsData);

        return $paginator;
    }
}
