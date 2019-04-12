<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    public function feedback()
    {
        return $this->belongsTo(Feedback::class);
    }
}
