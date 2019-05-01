<?php

namespace App\Http\Controllers;
use App\Group;

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

    public function index()
    {
        $response = Group::all();
        return $this->jsonUtf($response); 
    }
}
