<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $table = "feedbacks";

    protected $guarded = [];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }
    public function status()
    {
        return $this->belongsTo(Status::class);
    }
    public function type()
    {
        return $this->belongsTo(FeedbackType::class);
    }
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
    public function files()
    {
        return $this->hasMany(File::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function response()
    {
        return $this->hasOne(Response::class);
    }
}
