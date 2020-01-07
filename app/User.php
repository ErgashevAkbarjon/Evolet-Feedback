<?php

namespace App;

use App\Mail\SetupPassword;
use Carbon\Carbon;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Laravel\Lumen\Auth\Authorizable;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'full_name', 'email', 'password'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    public function customers()
    {
        return $this->hasMany(Customer::class);
    }

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }

    public function isCustomer()
    {
        return Customer::where('user_id', $this->id)->exists();
    }

    public function isEmployee()
    {
        return Employee::where('user_id', $this->id)->exists();
    }

    public function getPasswordResetToken()
    {
        $token = '';
        $tokenIsNotUnique = true;

        while($tokenIsNotUnique){
            $token = str_random(40);
    
            $tokenIsNotUnique = DB::table('password_resets')->where('token', $token)->exists();
        }

        $newPasswordReset = [
            'email' => $this->email,
            'token' => $token,
            'created_at' => Carbon::now()
        ];

        DB::table('password_resets')->insert($newPasswordReset);

        return $token;
    }
    
    public function notifyToSetupPassword()
    {
        $resetToken = $this->getPasswordResetToken();

        Mail::to($this)->send(new SetupPassword($resetToken));
    }
}
