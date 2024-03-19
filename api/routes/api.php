<?php

use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(['auth:sanctum', 'is_banned'])->get('/user', function (Request $request) {
    return response()->json([
        'user' => auth()->user(),
        'notifications' => $request->user()->unreadNotifications,
        'role' => auth()->user()->getRoleNames(),
    ]);
});

Route::middleware('role:admin')->get('/users', function (Request $request) {
    $data = \App\Models\User::where('id', '!=', Auth::id())->get();
    $users = [];

    foreach ($data as $user) {
        array_push($users, [
            'user' => $user,
            'role' => \App\Models\User::find($user->id)->getRoleNames(),
        ]);
    }

    return response()->json($users);
});

Route::middleware('role:admin')->post('/users/{id}/ban', function (Request $request) {
    $user = \App\Models\User::find($request->id);

    $user->assignRole('banned');

    return response()->json([
        'banned' => true,
    ]);
});

Route::middleware('role:admin')->delete('/users/{id}', function (Request $request) {
    \App\Models\User::where('id', $request->id)->delete();

    return response()->json([
        'delete' => true,
    ]);
});

Route::post('/notifications/{notification}/read', function (DatabaseNotification $notification) {
    $notification->markAsRead();

    return response()->json([
        'read' => true,
    ]);
});

Route::post('/notifications/read-all', function (Request $request) {
    auth()->user()->unreadNotifications->markAsRead();

    return response()->json([
        'read' => true,
    ]);
});
