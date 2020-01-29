<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $fillable = ['name'];
    public $timestamps = false;

    public const PENDING_STATUS_ID = 1;
    public const ACCEPT_STATUS_ID = 2;
    public const DENY_STATUS_ID = 3;

    public function feedbacks()
    {
        return $this->hasMany(Feedback::class);
    }

}
