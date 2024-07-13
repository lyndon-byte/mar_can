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
        Schema::create('applicant_awards', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('award_id')->nullable();
            $table->foreign('award_id')->references('id')->on('users');
            $table->string('award_name')->nullable();
            $table->string('award_provider')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicant_awards');
    }
};
