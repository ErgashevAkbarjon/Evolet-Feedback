<?php

namespace App\Http\Controllers;

use App\Customer;
use App\Feedback;
use App\File;
use App\Role;
use App\Status;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function __construct() {
        $customerMIddleware = 'role:' . Role::CUSTOMER_ROLE_NAME;

        $this->middleware($customerMIddleware, ['only' => ['store']]);
    }

    public function index(Request $request)
    {
        $result = Feedback::with([
                'status',
                'customer.user:id,full_name',
                'customer.pc',
                'group'
            ]);
        
        $currentUser = $request->auth;
        
        if($currentUser->isCustomer()){
            $customerID = Customer::where('user_id', $currentUser->id)->first()->id;
            $result->where('customer_id', $customerID);
        }

        $result = $this->filterByRequest($request, $result)->latest()->get();
        
        return $result; 
    }

    public function show($id, Request $request)
    {
        $feedback = Feedback::with([
            'status',
            'group',
            'type',
            'customer.user:id,full_name',
            'customer.pc',
            'response',
            'files'
        ])->find($id);
        
        if (
            $request->auth->isCustomer() && 
            $feedback->customer->user->id === $request->auth->id
        ){
            return $feedback;
        }

        if ($request->auth->isEmployee()){
            $currentEmployee = $request->auth->employee;
            $employeeHasAccess = $currentEmployee->groups->contains($feedback->group_id);

            if($employeeHasAccess){
                return $feedback;
            }
        }

        return response()->json([
            'error' => 'Access denied!'
        ], 403);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'type_id' => 'required',
            'group_id' => 'required',
            'description' => 'required',
        ]);

        $newFeedbackData = $request->only(['type_id', 'group_id', 'description']);
        
        $currentUser = $request->auth;

        $customer = Customer::where('user_id', $currentUser->id)->first();
        
        $newFeedbackData['customer_id'] = $customer->id;

        $newFeedback = Feedback::create($newFeedbackData);

        $files = $request->allFiles();

        if(!$files){
            return $newFeedback;
        }

        $files = $files['files'];

        $feedbackFolderName = '\\'. $newFeedback->id;
        $publicFolder = '\public';
        $fileRelativeFolder = '\feedback-files' . $feedbackFolderName;
        $fullFileFolder = base_path() . $publicFolder . $fileRelativeFolder;
        

        foreach ($files as $file) {
            
            $fileName = $file->getClientOriginalName();

            $file->move($fullFileFolder, $fileName);

            $fileUrl = $fileRelativeFolder. '\\' . $fileName;

            File::create([
                'name' => $fileName,
                'url' => $fileUrl,
                'feedback_id' => $newFeedback->id
            ]);
        }
        return $newFeedback;
    }

    public function update($id, Request $request)
    {
        $feedback = Feedback::find($id);
        $requests = $request->all();

        $modelProps = array_keys($feedback->getAttributes());

        foreach ($requests as $key => $value) {
            if(in_array($key, $modelProps)){
                $this->updateField($request, $key, $value, $feedback);
            }
        }

        $feedback->save();
    }

    public function destroy($id)
    {
    }

    /**
     * Helpers
     */

    private function updateField($request, $field, $value, $feedback)
    {
        switch ($field) {
            case 'status_id':
                $this->onStatusUpdate($request, $feedback, $value);
                break;
            default:
                $feedback->$field = $value;
        }        
    }

    private function onStatusUpdate(Request $request, Feedback $feedback, $statusValue)
    {
        $currentUser = $request->auth;
        
        if(!$currentUser->isEmployee()){
            return;
        }
        
        $feedback->status_id = $statusValue;
        
        if($statusValue === Status::ACCEPT_STATUS_ID){
            $currentCustomer = Customer::find($feedback->customer_id);
            $currentCustomer->bonus += 1;
            $currentCustomer->save();
        }
    }
}
