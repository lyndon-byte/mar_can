<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $password = uniqid();

        $super_admin = User::updateOrCreate(

            ['role' => 'SuperAdmin'],

            [

                'name' => 'Admin',
                'last_name' => 'Admin',
                'email' => 'super_admin@marcan.com',
                'role' => 'SuperAdmin',
                'password' => Hash::make($password)

            ]

        );

        $this->command->info('Super Admin created successfully, feel free to update or change the password immediately :)');
        $this->command->info('Name: ' . $super_admin->name);
        $this->command->info('Email: ' . $super_admin->email);
        $this->command->info('Password: ' . $password);
    }
}
