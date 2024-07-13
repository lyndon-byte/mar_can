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
        Schema::create('applicant_work_experiences', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('work_exp_id')->nullable();
            $table->foreign('work_exp_id')->references('id')->on('users');
            $table->string('job_title')->nullable();
            $table->string('company_name')->nullable();
            $table->string('location')->nullable();
            $table->string('employment_dates')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicant_work_experiences');
    }
};
