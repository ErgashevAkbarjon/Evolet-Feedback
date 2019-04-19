<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class Controller extends BaseController
{
    protected function jsonUtf($data, $code = 200)
    {
        return response()->json(
            $data,
            $code,
            ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],
            JSON_UNESCAPED_UNICODE
        );
    }

    protected function filterByRequest(Request $request, Builder $query)
    {
        if($request->method() !== 'GET') return $query;

        $tempQuery = clone $query;

        $modelAttributes = array_keys($tempQuery->first()->getAttributes());
        $requests = $request->all();

        foreach ($requests as $key => $value) {
            if($value && in_array($key, $modelAttributes)){
                $query = $query->where($key, $value);
            }
        }

        return $query;
    }
}
