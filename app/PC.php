<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PC extends Model
{
    protected $fillable = [
        'name',
        'logo'
    ];
    protected $table = 'pcs';

    public function customers()
    {
        return $this->hasMany(Customer::class);
    }
}
