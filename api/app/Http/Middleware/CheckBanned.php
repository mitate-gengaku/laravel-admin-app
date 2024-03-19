<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckBanned
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            if (Auth::user()->getRoleNames()->contains('banned')) {
                Auth::logout();

                $request->session()->invalidate();
                $request->session()->regenerateToken();

                return response()->json([
                    'banned' => true,
                ], 403);
            } else {
                return $next($request);
            }
        }

        return response()->json([
            'login' => false,
        ], 401);
    }
}
