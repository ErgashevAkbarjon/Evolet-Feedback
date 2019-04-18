<?php

namespace App\Http\Controllers;

use App\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function index()
    {
        $result = Feedback::with([
                'status',
                'customer.user:id,full_name',
                'customer.pc:id,name'
            ])->get();

        return $this->jsonUtf($result);

    }

    public function show($id)
    {
        $result = Feedback::with([
            'status',
            'group',
            'type',
            'customer.user:id,full_name',
            'customer.pc:id,name',
            'files'
        ])->find($id);

        return $this->jsonUtf($result);
    }

    public function store(Request $request)
    {
    }

    public function update($id, Request $request)
    {
        $feedback = Feedback::find($id);
        $requests = $request->all();

        $modelProps = array_keys($feedback->getAttributes());

        foreach ($requests as $key => $value) {
            if(in_array($key, $modelProps)){
                $feedback->$key = $value;
            }
        }

        $feedback->save();
    }

    public function destroy($id)
    {

    }
}
