<?php

use Illuminate\Support\Facades\Route;

$frontend = rtrim(env('FRONTEND_URL', 'http://localhost:3000'), '/');

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/test', function () {
    return response()->json([
        'test' => 'EZ A PROJEKT FUT',
    ]);
});

// SPA: browser GET → React; API POST stays in auth.php
Route::redirect('/login', $frontend.'/login');
Route::redirect('/register', $frontend.'/register');

require __DIR__.'/auth.php';
