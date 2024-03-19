<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Notifications\TestNotification;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $i = 1;
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'test',
            'email' => 'test@test.com',
            'password' => 'password',
        ]);
        \App\Models\User::factory()->create([
            'name' => 'test1',
            'email' => 'test1@test.com',
            'password' => 'password',
        ]);
        \App\Models\User::factory(2)->create();

        $user = \App\Models\User::find(1);
        while ($i <= 20) {
            $user->notify(new TestNotification(\App\Models\User::find(2)));
            $i++;
        }

        $admin = Role::create(['name' => 'admin']);

        $permissionOfDeleteAccount = Permission::create(['name' => 'delete account']);

        $admin->givePermissionTo($permissionOfDeleteAccount);

        $user->assignRole('admin');

        $banned = Role::create(['name' => 'banned']);
    }
}
