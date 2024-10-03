<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\Dashboard;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [Dashboard::class, '__invoke'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

		Route::prefix('students')->name('students.')->group(function () {
			Route::get('/', [StudentController::class, 'index'])->name('index');
			Route::post('/', [StudentController::class, 'store'])->name('store');
			Route::delete('/{student}', [StudentController::class, 'destroy'])->name('destroy');
			Route::patch('/{student}', [StudentController::class, 'update'])->name('update');
		});
});

require __DIR__.'/auth.php';
