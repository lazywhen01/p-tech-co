<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Student\Student;


class Dashboard extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
			$studentCount = Student::count();
			return Inertia::render('Dashboard' , ['studentCount' => $studentCount, ]);

    }
}
