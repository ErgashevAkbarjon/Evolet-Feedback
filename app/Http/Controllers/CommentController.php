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
        return $this->jsonUtf($response);
    }

    public function store(Request $request)
    {

        $this->validate($request, [
            'body' => 'required',
            'author_id' => 'required',
            'feedback_id' => 'required',
        ]);

        $commentFieldsValues = $request->only([
            'body',
            'parent_id',
            'feedback_id',
        ]);
        
        $employee = Employee::where('user_id', $request->author_id)->first();
        
        if(!$employee){
            return response(['error' => 'Author is not an employee !']);
        }

        $commentFieldsValues['employee_id'] = $employee->id;

        Comment::create($commentFieldsValues);
    }
}
