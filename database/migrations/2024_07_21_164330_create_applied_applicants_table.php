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
        Schema::create('applied_applicants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('applicant_id')->nullable();
            $table->foreign('applicant_id')->references('id')->on('posted_jobs');
            $table->string('user_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applied_applicants');
    }
};
