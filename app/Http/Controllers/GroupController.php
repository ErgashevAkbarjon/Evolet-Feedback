<?php

namespace App\Http\Controllers;

use App\Employee;
use App\Feedback;
use App\Group;
use App\Role;
use Illuminate\Http\Request;

class GroupController extends Controller
{

    public function __construct() {
        $adminMIddleware = "role:" . Role::ADMIN_ROLE_NAME;

        $this->middleware($adminMIddleware, ['except' => ['index']]);
    }

    public function index(Request $request)
    {
        $query = Group::query();
        
        $authUser = $request->auth;

        if($authUser->isEmployee()){

            $employeeId = $authUser->employee->id;
            
            //If current user is employee, then return only employee groups
            $query->whereHas('employees', function ($query) use($employeeId){
                $query->where('employee_id', $employeeId);
            });
        }

        return $this->processIndexRequestItems($request, $query, false);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
        ]);

        $newGroup = Group::create($request->only(['name']));
        
        $admins = Employee::withRole(Role::ADMIN_ROLE_NAME)->get();

        $newGroup->employees()->attach($admins);

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
