<?php

namespace App\Http\Controllers;

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

        return response()->json($this->makeJwt($user));
    }

    private function makeJwt(User $user)
    {
        $payload = [
            'iss' => "lumen-jwt", // Issuer of the token
            'sub' => $user->id, // Subject of the token
            'iat' => time(), // Time when JWT was issued. 
            'exp' => time() + 60*60 // Expiration time
        ];
        
        // As you can see we are passing `JWT_SECRET` as the second parameter that will 
        // be used to decode the token in the future.
        return JWT::encode($payload, env('JWT_SECRET'));
    }
}
