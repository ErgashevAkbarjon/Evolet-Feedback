<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    protected $fillable = ['body', 'employee_id', 'feedback_id'];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function feedback()
    {
        return $this->belongsTo(Feedback::class);
    }
}
