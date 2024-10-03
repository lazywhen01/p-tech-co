<?php

namespace App\Http\Controllers;

use App\Http\Requests\Student\StoreStudentRequest;
use App\Http\Requests\Student\UpdateStudentRequest;
use App\Models\Student\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request)
	{
		$paginate = $request->paginate ?? 5;
		$search = trim($request->search);

		$students = Student::search($search ?? '')
		->query(function ($query) {
			$query->select('id', 'name', 'created_at');
		})
		->paginate($paginate);
		return Inertia::render('Student/Index' , ['students' => $students,'search' => $search ]);
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(StoreStudentRequest $request , Student $student)
	{
		$data = $request->validated();

		$student = new Student();

		$student->name = $data['name'];
		$student->save();
		
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Student $student)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Student $student)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(UpdateStudentRequest $request, Student $student)
	{
		$data = $request->validated();

		$student->name = $data['name'];
		$student->save();
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Student $student)
	{
		$student->delete();
	}
}
