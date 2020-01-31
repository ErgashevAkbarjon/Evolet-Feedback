<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Employee;
use Illuminate\Http\Request;

// use Carbon\Carbon;

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

        $comments = $this->filterByRequest($request, $commentQuery)->get()->toArray();

        $response = $this->toTree($comments);
        
        return $response;
    }

    public function store(Request $request)
    {

        $this->validate($request, [
            'body' => 'required',
            'feedback_id' => 'required',
        ]);

        $commentFieldsValues = $request->only([
            'body',
            'parent_id',
            'feedback_id',
        ]);
        
        $currentEmployee = $request->auth->employee; // Employee::where('user_id', $request->author_id)->first();
        
        if(!$currentEmployee){
            return response(['error' => 'Only employees can add comments !']);
        }

        $commentFieldsValues['employee_id'] = $currentEmployee->id;

        Comment::create($commentFieldsValues);
    }
}
