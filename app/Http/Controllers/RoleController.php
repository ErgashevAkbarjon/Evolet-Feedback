<?php

namespace App\Http\Controllers;

use App\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $query = Role::where('name', '<>', Role::CUSTOMER_ROLE_NAME);

        return $this->processIndexRequestItems($request, $query, false);
    }    
}
