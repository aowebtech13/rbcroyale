<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Mail\VerificationMail;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules;

use Illuminate\Validation\ValidationException;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $request->validate([
                'fullname' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
                'phone' => ['required', 'string', 'max:20'],
                'password' => ['required', Rules\Password::defaults()],
            ]);

            $verificationCode = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

            $user = User::create([
                'name' => $request->fullname,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make($request->password),
                'role' => 'user', // Default role
                'balance' => 1.00, // Welcome bonus
                'email_verification_code' => $verificationCode,
                'email_verification_expires_at' => now()->addMinutes(10),
            ]);

            // Send verification email immediately
            try {
                Mail::to($user->email)->send(new VerificationMail($verificationCode));
            } catch (\Exception $e) {
                \Log::error('Mail Sending Error: ' . $e->getMessage());
                // Continue registration even if mail fails
            }

            event(new Registered($user));

            // Create a welcome bonus transaction
            \App\Models\Transaction::create([
                'user_id' => $user->id,
                'type' => 'deposit',
                'amount' => 1.00,
                'status' => 'completed',
                'description' => 'Welcome Bonus',
                'method' => 'System'
            ]);

            if ($request->hasSession()) {
                Auth::login($user);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Registration failed: ' . $e->getMessage(),
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Registration Error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Registration failed: ' . $e->getMessage(),
            ], 500);
        }
    }
}
