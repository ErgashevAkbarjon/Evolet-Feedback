<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function pc()
    {
        return $this->belongsTo(PC::class);
    }
    public function feedbacks()
    {
        return $this->hasMany(Feedback::class);
    }
}
