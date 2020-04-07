<?php

namespace App\Http\Controllers;

use App\Employee;
use App\Response;
use App\Role;
use Illuminate\Http\Request;

class ResponseController extends Controller
{
    public function __construct()
    {
        $employeeOrAdminMiddleware = 'role:' . Role::EMPLOYEE_ROLE_NAME . ',' . Role::ADMIN_ROLE_NAME;

        $this->middleware($employeeOrAdminMiddleware,
            ['only' => ['store']]
        );
    }

    public function index(Request $request)
    {
        $responsesQuery = Response::with('employee.user:id,full_name');

        return $this->processIndexRequestItems($request, $responsesQuery, false);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'body' => 'required',
            'feedback_id' => 'required',
        ]);
        
        $newResponseData = $request->only(['body','feedback_id']);

        $currentEmployee = $request->auth->employee;

        $newResponseData['employee_id'] = $currentEmployee->id;

        Response::create($newResponseData);

    }

}
