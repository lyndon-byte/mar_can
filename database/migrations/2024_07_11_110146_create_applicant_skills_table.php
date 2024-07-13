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
        Schema::create('applicant_skills', function (Blueprint $table) {

            $table->id();
            $table->unsignedBigInteger('skill_id')->nullable();
            $table->foreign('skill_id')->references('id')->on('users');
            $table->string('skill_name')->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicant_skills');
    }
};
