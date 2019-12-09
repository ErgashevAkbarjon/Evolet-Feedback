<?php

namespace App\Http\Controllers;

use App\Response;
use Illuminate\Http\Request;

class ResponseController extends Controller
{
    public function index(Request $request)
    {
        $responsesQuery = Response::with('employee.user:id,full_name');

        $response = $this->filterByRequest($request, $responsesQuery)->get();

        return $response;
    }

    public function show($id)
    {
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'body' => 'required',
            'employee_id' => 'required',
            'feedback_id' => 'required',
        ]);

        Response::create($request->only(['body', 'employee_id', 'feedback_id']));

    }

    public function update($id, Request $request)
    {
    }

    public function destroy($id)
    {
    }
}
