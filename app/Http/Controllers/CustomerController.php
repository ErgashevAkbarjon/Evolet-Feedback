<?php

namespace App\Http\Controllers;

use App\Customer;
use App\Mail\SetupPassword;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

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
            'email' => 'required|email|unique:users',
            'pc' => 'required'
        ]);
        
        $user = $request->only(['full_name', 'email']);
        $user['password'] = Hash::make(str_random(10));
        
        $user = User::create($user);
        
        $this->notifyToSetupPassword($user);

        $customerData = [
            'user_id' => $user->id,
            'pc_id' => $request->pc
        ];

        $newCustomer = Customer::create($customerData);
        return $newCustomer;
    }
    
    public function update($id, Request $request)
    {
        $customerToUpdate = Customer::find($id);
        $requestItems = $request->all();
        
        foreach ($requestItems as $item => $value) {
            switch ($item) {
                case 'full_name':
                case 'email':
                    $this->updateCustomerUser($customerToUpdate, $item, $value);
                    break;
                case 'pc':
                    $customerToUpdate->pc_id = $value;
                    break;
            }
        }

        $customerToUpdate->save();
        
        return $customerToUpdate->load('user', 'pc');
    }

    public function destroy($id)
    {
        $customerToDelete = Customer::find($id);
        $customerUserId = $customerToDelete->user_id;

        Customer::destroy($customerToDelete->id);
        User::destroy($customerUserId);
    }   

    /**
     * Helpers
     */

    private function notifyToSetupPassword(User $user)
    {
        $resetToken = $user->getPasswordResetToken();

        Mail::to($user)->send(new SetupPassword($resetToken));
    }

    private function updateCustomerUser($customer, $attribute, $value)
    {
        User::where('id', $customer->user_id)->update([$attribute => $value]);
    }
}
