<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Http\Requests\StoreCategoriesRequest;
use App\Http\Requests\UpdateCategoriesRequest;
use Illuminate\Cache\Events\RetrievingKey;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Laravel\Prompts\Support\Result;

class CategoriesController extends Controller
{
    protected $categories;
    public function __construct(Categories $categories)
    {
        $this->categories = $categories;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $categories = $this->categories->with('books')->get( );

        return response()->json($categories, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoriesRequest $request): JsonResponse
    {
        $data = $request->validated(); 
        $categories = $this->categories->create($data);
        $id = $categories->id;
        $categories_books = $this->categories->with('books')->findOrFail($id);

        return response()->json($categories_books, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $categories = $this->categories->with('books')->FindOrFail($id);

        return response()->json($categories, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoriesRequest $request, $id): JsonResponse
    {
        $data = $request->validated();
        $categories = $this->categories->with('books')->FindOrFail($id);
        $categories->update($data);
        
        return response()->json($categories, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $categories = $this->categories->FindOrFail($id);
        $categories->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
