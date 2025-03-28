<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;

class ShareTranslations
{
    public function handle(Request $request, Closure $next)
    {
        View::share('translations', [
            'welcome' => __('messages.welcome'),
            'dashboard' => __('messages.dashboard'),
            'profile' => __('messages.profile'),
            'settings' => __('messages.settings'),
            'logout' => __('messages.logout'),
            'login' => __('messages.login'),
            'register' => __('messages.register'),
            'email' => __('messages.email'),
            'password' => __('messages.password'),
            'remember_me' => __('messages.remember_me'),
            'forgot_password' => __('messages.forgot_password'),
            'reset_password' => __('messages.reset_password'),
            'confirm_password' => __('messages.confirm_password'),
            'name' => __('messages.name'),
            'send_reset_link' => __('messages.send_reset_link'),
            'already_registered' => __('messages.already_registered'),
            'not_registered' => __('messages.not_registered'),
        ]);

        return $next($request);
    }
}
