<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Books extends Model
{   
    use HasFactory, HasUuids;

    protected $fillable = [
        'title',
        'author',
        'price',
        'amount',
        'image',
        'categories_id'
    ];

    public function categories(){
        return $this->belongsTo(Categories::class, 'categories_id', 'id');
    }

    protected static function booted(){
        self::deleted(function(Books $books){
            try{
                $image_name = explode('books/', $books['image']);
                Storage::disk('public')->delete('books/'.$image_name[1]);
            }catch(Throwable){}
        });
    }
}