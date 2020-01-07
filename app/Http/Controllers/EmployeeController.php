<?php

namespace App\Http\Controllers;

use App\User;
use App\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{

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

        $relativeAvatarPath = null;

        if ($request->hasFile('avatar')) {
            $relativeAvatarPath = $this->saveAvatar($newUser->id, $request->file('avatar'));
        }

        $newEmployee = Employee::create([
            'user_id' => $newUser->id,
            'avatar' => $relativeAvatarPath
        ]);
        
        $groups = json_decode($request->groups);

        if($groups){
            $newEmployee->groups()->attach($groups);
        }

        return $newEmployee->load('user');
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

    public function destroy($id, Request $request)
    {
        $employeeToDelete = Employee::find($id);

        $employeeUserID = $employeeToDelete->user_id;

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
        $publicPath = base_path() . '/public';
        $avatarsFolderPath = '/images/avatars/';

        $avatar->move($publicPath . $avatarsFolderPath, $fileName);

        return $avatarsFolderPath . $fileName;
    }

    public function updateAvatar(Employee $employee, $avatar)
    {
        if(!$avatar || $avatar == 'null') return; //FIXME shoud implement avatar resetting feature, now doesn't

        $filePath = $this->saveAvatar($employee->id, $avatar);

        $employee->avatar = $filePath;

        $employee->save();
    }
}
