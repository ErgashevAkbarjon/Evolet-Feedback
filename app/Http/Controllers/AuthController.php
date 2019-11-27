<?php

namespace App\Http\Controllers;

use App\Customer;
use App\Employee;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Firebase\JWT\JWT;

class AuthController extends Controller
{
    public function authenticate(Request $request)
    {
        $this->validate($request, [
            'email' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('email', $request['email'])->first();

        if (!$user) {
            return response()->json(
                ['error' => "There isn't a user with such email"],
                400
            );
        }

        $isPasswordCorrect = Hash::check($request['password'], $user->password);
        
        if(!$isPasswordCorrect){
            return response()->json(
                ['error' => "Incorrect password"],
                400
            );
        }

        $userIsEmployee = Employee::where('user_id', $user->id)->exists();
        $userIsCustomer = Customer::where('user_id', $user->id)->exists();

        if($userIsEmployee && !$userIsCustomer){
            $user->type = 1;
        } else {
            $user->type = 2;
        }

        return response()->json($this->makeJwt($user, $request->ip()));
    }


    /**
     * Helpers
     */

    private function makeJwt(User $user, $ipAddress)
    {
        $payload = [
            'iss' => "lumen-jwt",
            'sub' => [$user, $ipAddress],
            'iat' => time(),
            'exp' => time() + 60*60
        ];
        
        return JWT::encode($payload, env('JWT_SECRET'));
    }
}
