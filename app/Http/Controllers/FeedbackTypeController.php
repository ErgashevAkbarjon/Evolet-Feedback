<?php

namespace App\Http\Controllers;
use App\FeedbackType;
use Illuminate\Http\Request;

class FeedbackTypeController extends Controller
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
        $response = FeedbackType::query();

        $response = $this->filterByRequest($request, $response)->get();

        return $response; 
    }
}
