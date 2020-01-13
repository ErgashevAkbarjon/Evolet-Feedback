<?php

namespace App\Http\Controllers;

use App\Feedback;
use App\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{

    public function index(Request $request)
    {
        $response = Group::query();

        $response = $this->filterByRequest($request, $response)->get();

        return $response;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
        ]);

        $newGroup = Group::create($request->only(['name']));

        return $newGroup;
    }

    public function show($id)
    {
        return Group::with('employees.user')->where('id', $id)->first();
    }

    public function update($id, Request $request)
    {
        $groupToUpdate = Group::find($id);

        if(!$request->has('name')) return;

        $groupToUpdate->name = $request->name;

        $groupToUpdate->save();

        return $groupToUpdate->load('employees.user');
    }

    public function destroy($id)
    {
        $groupToDelete = Group::find($id);

        Feedback::where('group_id', $groupToDelete->id)->delete();

        $groupToDelete->delete();
    }
}
