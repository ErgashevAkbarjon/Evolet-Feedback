<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $fillable = ['name'];
    public $timestamps = false;

    public function employees()
    {
        return $this->belongsToMany(Employee::class, 'employee_group');
    }
}
