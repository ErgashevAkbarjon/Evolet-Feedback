<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    public function feedbacks()
    {
        return $this->hasMany(Feedback::class);
    }

}
