<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function authenticate(Request $request)
    {
        $this->validate($request, [
            'email' => 'required',
            'password' => 'required',
        ]);

        $user = User::with('roles:id')->where('email', $request['email'])->first();

        if (!$user) {
            return response()->json(
                ['error' => "Неправильно введен email или пароль"],
                400
            );
        }

        $isPasswordCorrect = Hash::check($request['password'], $user->password);
        
        if(!$isPasswordCorrect){
            return response()->json(
                ['error' => "Неправильно введен email или пароль"],
                400
            );
        }

        return response()->json($this->makeJwt($user, $request->ip()));
    }

    public function showPasswordReset($token)
    {
        $validToken = DB::table('password_resets')->where('token', $token)->exists();

        if(!$validToken) return redirect('/');

        return view('auth.passwordReset', compact('token'));
    }

    public function passwordReset(Request $request, $token)
    {
        $this->validate($request, [
            'password' => 'required|confirmed'
        ]);
        
        $userEmail = DB::table('password_resets')->where('token', $token)->value('email');

        $user = User::where('email', $userEmail)->first();
        
        $user->password = Hash::make($request->password);

        $user->save();
        
        DB::table('password_resets')->where('token', $token)->delete();

        return redirect('/');
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
            'exp' => time() + 60 * 60 * 4 //4 hours
        ];
        
        return JWT::encode($payload, env('JWT_SECRET'));
    }
}
