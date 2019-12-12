<?php

namespace App\Http\Controllers;

use App\Customer;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $result = Customer::with(['user', 'pc']);

        $result = $this->filterByRequest( $request, $result )->get();

        return $result;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'full_name' => 'required',
            'email' => 'required',
            'pc' => 'required'
        ]);
        
        $user = $request->only(['full_name', 'email']);
        $user['password'] = Hash::make('customer');
        
        $user = User::create($user);

        $customerData = [
            'user_id' => $user->id,
            'pc_id' => $request->pc
        ];

        $newCustomer = Customer::create($customerData);

        return $newCustomer;
    }
}
