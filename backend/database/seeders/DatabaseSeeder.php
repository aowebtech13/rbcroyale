<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            InvestmentPlanSeeder::class,
            PartnershipSeeder::class,
        ]);

        // Create Admin User
        User::updateOrCreate(
            ['email' => 'Paef_aydsfn@lexicron.org'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('AsW#$%^&Pa_aDd57'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        // Create Test User
        User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'role' => 'user',
            ]
        );
    }
}
