<?php

namespace App\Http\Controllers;

use App\Models\Books;
use App\Http\Requests\StoreBooksRequest;
use App\Http\Requests\UpdateBooksRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class BooksController extends Controller
{
    private $books;

    public function __construct(Books $books)
    {
        $this->books = $books;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $books = $this->books->with('categories')->get();

        return response()->json($books, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBooksRequest $request)
    {
        $data = $request->validated();
        if($request->has('file')){
            $path = $request->file('image')->store('books', 'public');
            $data['image'] = url('storage/'.$path);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Books $books)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Books $books)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBooksRequest $request, Books $books)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Books $books)
    {
        //
    }
}
