<?php

namespace App\Http\Controllers;

use App\Customer;
use App\Role;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CustomerController extends Controller
{
    public function __construct()
    {
        $adminMiddleware = "role:" . Role::ADMIN_ROLE_NAME;
        $customerOrAdminMiddleware = $adminMiddleware . ',' . Role::CUSTOMER_ROLE_NAME;

        $this->middleware($adminMiddleware, ['except' => ['index', 'show']]);
         
        //FIXME Deny index, after refactoring the frontend part
        $this->middleware($customerOrAdminMiddleware, ['only' => ['index', 'show']]);
    }

    public function index(Request $request)
    {
        $query = Customer::with(['user', 'pc']);

        return $this->processIndexRequestItems($request, $query);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'full_name' => 'required',
            'email' => 'required|email|unique:users',
            'pc' => 'required',
        ]);

        $user = $request->only(['full_name', 'email']);

        $user['password'] = Hash::make(str_random(10));

        $user = User::create($user);

        $user->roles()->attach(Role::where('name', Role::CUSTOMER_ROLE_NAME)->first());

        $user->notifyToSetupPassword();

        $customerData = [
            'user_id' => $user->id,
            'pc_id' => $request->pc,
        ];

        $newCustomer = Customer::create($customerData);
        return $newCustomer;
    }

    public function show($id)
    {
        return Customer::with(['user', 'pc'])->where('id', $id)->first();
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
        $customerToDelete = Customer::with('user')->where('id', $id)->first();
        $customerUserId = $customerToDelete->user_id;

        DB::table('password_resets')->where('email', $customerToDelete->user->email)->delete();
        Customer::destroy($customerToDelete->id);
        User::destroy($customerUserId);
    }

    /**
     * Helpers
     */

    private function updateCustomerUser($customer, $attribute, $value)
    {
        User::where('id', $customer->user_id)->update([$attribute => $value]);
    }
}
