<?php

namespace App\Http\Controllers;

use App\Feedback;

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
}
