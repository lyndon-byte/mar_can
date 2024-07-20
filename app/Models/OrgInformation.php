<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrgInformation extends Model
{
    use HasFactory;

    protected $fillable = [

       'org_id',
       'org_name',
       'org_overview',
       'org_street',
       'org_city',
       'org_province',
       'org_country',
       'org_industry',
       'org_size',
    
    ];
}
