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

        $sampleModel = $tempQuery->first();

        if(!$sampleModel) return $query;

        $modelAttributes = array_keys($sampleModel->getAttributes());
        $requests = $request->all();

        foreach ($requests as $key => $value) {
            if($value && in_array($key, $modelAttributes)){
                $query = $query->where($key, $value);
            }
        }

        return $query;
    }
    
    public function toTree(Array $array, $parentId = null)
    {
        $tree = [];
        foreach ($array as $item) {
            if($item['parent_id'] === $parentId){

                foreach ($array as $innerItem) {
                    if($item['id'] === $innerItem['parent_id']){
                        $item['children'] = $innerItem;
                    }
                }
                $item['children'] = $this->toTree($array, $item['id']);
                $tree[] = $item;
            }
        }
        return $tree;
    }
}
