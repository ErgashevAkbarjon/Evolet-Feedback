<?php

namespace App\Http\Controllers;
use App\FeedbackType;
use Illuminate\Http\Request;

class FeedbackTypeController extends Controller
{
    public function index(Request $request)
    {
        $query = FeedbackType::query();

        return $this->processIndexRequestItems($request, $query, false);
    }
}
