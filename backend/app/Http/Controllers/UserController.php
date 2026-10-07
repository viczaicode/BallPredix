<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        return User::query()
            ->select(['id', 'name', 'email', 'created_at'])
            ->orderByDesc('created_at')
            ->get();
    }
}
