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
        Schema::create('applicant_professional_summaries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pro_summary_id')->nullable();
            $table->foreign('pro_summary_id')->references('id')->on('users');
            $table->text('summary')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicant_professional_summaries');
    }
};
