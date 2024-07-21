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
        Schema::create('posted_jobs', function (Blueprint $table) {

            $table->id();
            $table->unsignedBigInteger('job_id');
            $table->foreign('job_id')->references('id')->on('users');
            $table->string('job_title');
            $table->text('job_description')->nullable();
            $table->text('location')->nullable();
            $table->text('salary')->nullable();
            $table->string('employment_type')->nullable(); //Full-time , part-time , contract , temporary , internship
            $table->string('work_schedule')->nullable(); 
            $table->string('start_date')->nullable();
            $table->text('status')->nullable();
            $table->timestamps();

        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posted_jobs');
    }
};
