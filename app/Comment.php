<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'body',
        'parent_id',
        'employee_id',
        'feedback_id',
    ];

    protected $with = ['employee.user:id,full_name'];

    protected $appends = ['humanCreateTime'];

    
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function feedback()
    {
        return $this->belongsTo(Feedback::class);
    }

    public function getHumanCreateTimeAttribute()
    {
        return $this->created_at->locale('ru_RU')->diffForHumans();
    }
}
