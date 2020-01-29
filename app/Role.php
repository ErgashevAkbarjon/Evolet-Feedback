<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $guarded = [];
    public $timestamps = false;

    public const ADMIN_ROLE_NAME = 'Администратор';
    public const EMPLOYEE_ROLE_NAME = 'Сотрудник';
    public const CUSTOMER_ROLE_NAME = 'Пользователь';

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
