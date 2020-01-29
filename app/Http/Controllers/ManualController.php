<?php

namespace App\Http\Controllers;

use App\Role;
use Illuminate\Http\Request;

class ManualController extends Controller
{
    const ADMIN_MANUAL_NAME = "admin.docx";
    const EMPLOYEE_MANUAL_NAME = "employee.docx";
    const CUSTOMER_MANUAL_NAME = "customer.docx";

    public function show(Request $request)
    {
        $currentUser = $request->auth;
        
        $manualName = "";

        if($currentUser->hasRole(Role::ADMIN_ROLE_NAME)){
            $manualName = self::ADMIN_MANUAL_NAME;
        } 
        elseif ($currentUser->hasRole(Role::EMPLOYEE_ROLE_NAME)){
            $manualName = self::EMPLOYEE_MANUAL_NAME;
        } else {
            $manualName = self::CUSTOMER_MANUAL_NAME;
        }
        
        $manualPath = $this->public_path("\manual\\" . $manualName);
        return response()->download($manualPath , "Evolet-Feedback-Manual.docx");
    }    
}
