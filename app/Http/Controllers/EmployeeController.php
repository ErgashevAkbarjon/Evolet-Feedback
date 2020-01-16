<?php

namespace App\Http\Controllers;

use App\User;
use App\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    const AVATARS_FOLDER = "/images/avatars/";
    const DEFAULT_AVATAR_PATH = "/images/avatars/default.jpg";

    public function index(Request $request)
    {
        $query = Employee::with(['groups', 'user']);

        $result = $this->filterByRequest($request, $query)->get();

        return $result;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'full_name' => 'required',
            'email' => 'required|email|unique:users',
        ]);

        $userData = $request->only(['full_name', 'email']);
        $userData['password'] = Hash::make(str_random(10));

        $newUser = User::create($userData);

        $newUser->notifyToSetupPassword();
        
        $newEmployeeData['user_id'] = $newUser->id;

        if ($request->hasFile('avatar')) {
            $newEmployeeData['avatar'] = $this->saveAvatar($newUser->id, $request->file('avatar'));
        }

        $newEmployee = Employee::create($newEmployeeData);
        
        $groups = json_decode($request->groups);

        if($groups){
            $newEmployee->groups()->attach($groups);
        }

        return $newEmployee->load('user');
    }

    public function show($id)
    {
        return Employee::with(['groups', 'user'])->where('id', $id)->first();
    }

    public function update($id, Request $request)
    {
        $employeeToUpdate = Employee::find($id);

        $requestItems = $request->all();

        foreach ($requestItems as $key => $value) {
            switch ($key) {
                case 'full_name':
                    $employeeToUpdate->user()->update(['full_name' => $value]);
                    break;
                case 'email':
                    $employeeToUpdate->user()->update(['email' => $value]);
                    break;
                case 'groups':
                    $employeeToUpdate->groups()->sync(json_decode($value));
                    break;
                case 'avatar':
                    $this->updateAvatar($employeeToUpdate, $value);
                    break;
            }
        }
        
        return $employeeToUpdate->load(['user', 'groups']);
    }

    public function destroy($id)
    {
        $employeeToDelete = Employee::find($id);

        $employeeUserID = $employeeToDelete->user_id;
        
        if($employeeToDelete->avatar != self::DEFAULT_AVATAR_PATH){
            $this->deletePublicFile($employeeToDelete->avatar); 
        }

        Employee::destroy($employeeToDelete->id);
        User::destroy($employeeUserID);
    }

    /**
     * Helpers
     */
    private function saveAvatar($name, $avatar)
    {
        $fileExtension = $avatar->extension();
        $fileName = "$name.$fileExtension";
        $publicPath = $this->public_path();

        $avatar->move($publicPath . self::AVATARS_FOLDER, $fileName);

        return self::AVATARS_FOLDER . $fileName;
    }

    public function updateAvatar(Employee $employee, $avatar)
    {
        if(!$avatar || $avatar == 'null') return; //FIXME shoud implement avatar resetting feature, now doesn't

        $filePath = $this->saveAvatar($employee->id, $avatar);

        $employee->avatar = $filePath;

        $employee->save();
    }
}
