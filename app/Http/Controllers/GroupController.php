<?php

namespace App\Http\Controllers;
use App\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function index(Request $request)
    {
        $response = Group::query();

        $response = $this->filterByRequest($request, $response)->get();

        return $this->jsonUtf($response); 
    }
}
