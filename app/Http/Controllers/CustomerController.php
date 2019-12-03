<?php

namespace App\Http\Controllers;

use App\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $result = Customer::query();

        $result = $this->filterByRequest( $request, $result )->get();

        return $this->jsonUtf($result);
    }
}
