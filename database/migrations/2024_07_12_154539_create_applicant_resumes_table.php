<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('applicant_resumes', function (Blueprint $table) {

            $table->id();
            $table->unsignedBigInteger('resume_id')->nullable();
            $table->foreign('resume_id')->references('id')->on('users');
            $table->string('file_name')->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicant_resumes'); 
    }
};
