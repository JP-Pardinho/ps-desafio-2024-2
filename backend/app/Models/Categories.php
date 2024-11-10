<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
    ];

    public function books(){
        return $this->hasMany(Books::class, 'categories_id', 'id');
    }

    protected static function booted(){ 
        self::deleting(function(Categories $categories) {
            $categories->books()->each(function ($books) {
                $books->delete();
            });
        });
    }
}
