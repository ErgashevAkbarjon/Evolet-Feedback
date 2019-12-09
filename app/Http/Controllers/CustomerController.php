<?php

namespace App\Http\Controllers;

use App\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $result = Customer::with(['user', 'pc']);

        $result = $this->filterByRequest( $request, $result )->get();

        return $result;
    }
}
