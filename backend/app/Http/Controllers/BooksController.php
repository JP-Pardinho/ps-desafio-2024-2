<?php

namespace App\Http\Controllers;

use App\Models\Books;
use App\Http\Requests\StoreBooksRequest;
use App\Http\Requests\UpdateBooksRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Throwable;

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
    public function store(StoreBooksRequest $request): JsonResponse
    {
        $data = $request->validated();
        if ($request->has('file')){
            $path = $request->file('image')->store('books', 'public');
            $data['image'] = url('storage/'.$path);
        }

        $books = $this->books->create($data);
        $id = $books->id;
        $books_categories = $this->books->with('categories')->findOrFail($id);

        return response()->json($books_categories, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id):JsonResponse
    {
        $books = $this->books->with('categories')->findOrFail($id);

        return response()->json($books, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBooksRequest $request, $id):JsonResponse
    {
        $data = $request->validated();
        $books = $this->books->with('categories')->findOrFail($id);
        if($request->hasFile('image')){
            try{
                $image_name = explode('books/', $books['image']);
                Storage::disk('public')->delete('books/'.$image_name[1]);
            }catch(Throwable){   
            }finally{
                $path = $request->file('image')->store('books', 'public');
                $data['image'] = url('storage/'.$path);    
            }
        }

        $books->update($data);
        return response()->json($books, Response::HTTP_OK);
    }
        

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id):JsonResponse
    {
        $books = $this->books->findOrFail($id);
        $books->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
