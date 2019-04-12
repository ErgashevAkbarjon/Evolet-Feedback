<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PC extends Model
{
    public function customers()
    {
        return $this->hasMany(Customer::class);
    }
}
