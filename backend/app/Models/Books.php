<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Books extends Model
{
    protected $fillable = [
        'title',
        'author',
        'price',
        'imagem',
        'categories_id'
    ];

    public function categories(){
        return $this->belongsTo(Categories::class, 'categories_id', 'id');
    }
}
