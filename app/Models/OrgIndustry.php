<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrgIndustry extends Model
{
    use HasFactory;

    protected $fillable = [

        'org_industry_id',
        'industry_name'
    ];
}
