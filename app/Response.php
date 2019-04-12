<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function feedback()
    {
        return $this->belongsTo(Feedback::class);
    }
}
