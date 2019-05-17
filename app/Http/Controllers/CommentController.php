<?php

namespace App\Http\Controllers;
use App\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
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
        $commentQuery = Comment::query();

        $response = $this->filterByRequest($request, $commentQuery)->get();

        return $this->jsonUtf($response);
    }

    public function store(Request $request)
    {

        $this->validate( $request , [
            'body' => 'required',
            'employee_id' => 'required',
            'feedback_id' => 'required',
        ]);
        
        $commentFieldsValues = $request->only([
            'body',
            'parent_id',
            'employee_id',
            'feedback_id'
        ]);
        
        Comment::create($commentFieldsValues);
    }
}
