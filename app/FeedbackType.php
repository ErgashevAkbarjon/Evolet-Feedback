<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FeedbackType extends Model
{
    public function feedbacks()
    {
        return $this->hasMany(Feedback::class);
    }
}
