<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $guarded = [];
        
    public function feedback()
    {
        return $this->belongsTo(Feedback::class);
    }
}
