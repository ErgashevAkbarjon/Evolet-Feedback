<?php

namespace App\Http\Controllers;

use App\PC;
use Illuminate\Http\Request;

class PCController extends Controller
{
    public function index(Request $request)
    {
        $result = PC::query();

        $result = $this->filterByRequest($request, $result)->get();

        return $result;
    }
}
