<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageThread extends Model
{
    use HasFactory;

    protected $fillable = [

       'thread_id',
       'recipient_name',
       'recipient_email',
       'latest_message',
       'latest_message_count',
       'avatar_color',
       'state',

    ];

    public function messages(){

        return $this->hasMany(Messages::class,'message_id');
    }
}
