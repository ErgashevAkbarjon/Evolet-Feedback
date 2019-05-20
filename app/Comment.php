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

    public function children()
    {
        return $this->hasMany(Comment::class, 'parent_id')
            ->with('children.employee')
            ->with('children.employee.user:id,full_name');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function feedback()
    {
        return $this->belongsTo(Feedback::class);
    }
}
