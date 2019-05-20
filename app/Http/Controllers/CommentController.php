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

        //TODO Refactor this
        $response = $this->filterByRequest($request, $commentQuery)
            ->with('children')
            ->with('children.employee:id,avatar')
            ->with('children.employee.user:id,full_name')
            ->with('employee:id,avatar')
            ->with('employee.user:id,full_name')
            ->where('parent_id', null)
            ->get();

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
