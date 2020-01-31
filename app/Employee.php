<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $guarded = [];

    public function groups()
    {
        return $this->belongsToMany(Group::class, 'employee_group');
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    
    public function responses()
    {
        return $this->hasMany(Response::class);
    }

    public function scopeWithRole($query, $roleName)
    {
        return $query->whereHas('user', function ($query) use($roleName){
            $query->whereHas('roles', function ($query) use($roleName){
               $query->where('name', $roleName);
            });
        });
    }
    
}
