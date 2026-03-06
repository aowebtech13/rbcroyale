<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\PageDataController;
use App\Http\Controllers\InvestmentController;

use App\Http\Controllers\WithdrawalController;

use App\Http\Controllers\Api\ProfileController;

Route::middleware(['throttle:api'])->group(function () {
    Route::get('/services', [PageDataController::class, 'services']);
    Route::get('/investment-plans', [InvestmentController::class, 'getPlans']);
    Route::get('/partnerships', [\App\Http\Controllers\PartnershipController::class, 'index']);
    Route::get('/partnerships/{id}', [\App\Http\Controllers\PartnershipController::class, 'show']);

    require __DIR__.'/auth.php';

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
        Route::get('/dashboard-data', [InvestmentController::class, 'getDashboardData']);
        Route::get('/available-groups', [InvestmentController::class, 'getAvailableGroups']);
        Route::get('/transactions', [InvestmentController::class, 'getTransactions']);
        Route::get('/investments', [InvestmentController::class, 'getInvestments']);
        Route::post('/investments/{id}/cancel', [InvestmentController::class, 'cancelInvestment'])->middleware('throttle:transactions');
        Route::post('/invest', [InvestmentController::class, 'invest'])->middleware('throttle:transactions');
        
        Route::get('/withdrawals', [WithdrawalController::class, 'index']);
        Route::post('/withdraw', [WithdrawalController::class, 'store'])->middleware('throttle:transactions');

        Route::get('/deposits', [\App\Http\Controllers\Api\DepositController::class, 'index']);
        Route::post('/deposit', [\App\Http\Controllers\Api\DepositController::class, 'store'])->middleware('throttle:transactions');
        Route::post('/deposit/paystack/verify', [\App\Http\Controllers\Api\DepositController::class, 'verifyPaystack'])->middleware('throttle:transactions');

        Route::get('/profile', [ProfileController::class, 'show']);
        Route::post('/profile', [ProfileController::class, 'update']);
        Route::post('/profile/password', [ProfileController::class, 'updatePassword']);
        Route::post('/profile/withdrawal-details', [ProfileController::class, 'updateWithdrawalDetails']);
    });

    // Public Paystack Webhook
    Route::post('/deposit/paystack/webhook', [\App\Http\Controllers\Api\DepositController::class, 'handleWebhook']);
});

use App\Mail\AdminNotificationMail;
use Illuminate\Support\Facades\Mail;

Route::middleware(['throttle:api', 'auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'index']);
    Route::get('/users', [AdminController::class, 'getAllUsers']);
    Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);
    Route::get('/investments', [AdminController::class, 'getAllInvestments']);
    // Correction: Use post or patch for status updates/cancellations
    Route::post('/investments/{id}/cancel', [AdminController::class, 'cancelInvestment']);
    Route::post('/investments/{id}/extend', [AdminController::class, 'extendInvestmentDate']);
    Route::get('/withdrawals', [AdminController::class, 'getAllWithdrawals']);
    Route::post('/withdrawals/{id}/status', [AdminController::class, 'updateWithdrawalStatus']);
    
    Route::get('/deposits', [AdminController::class, 'getAllDeposits']);
    Route::post('/deposits/{id}/status', [AdminController::class, 'updateDepositStatus']);
    
    Route::post('/send-test-email', function (Request $request) {
        $user = $request->user();
        Mail::to($user->email)->send(new AdminNotificationMail(
            $user,
            'Test Notification',
            'This is a test notification from the admin area.',
            config('app.url') . '/admin/dashboard'
        ));

        return response()->json(['message' => 'Test email sent successfully.']);
    });
});
