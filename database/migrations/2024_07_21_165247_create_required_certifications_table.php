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
        Schema::create('required_certifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('required_certification_id')->nullable();
            $table->foreign('required_certification_id')->references('id')->on('posted_jobs');
            $table->text('certification')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('required_certifications');
    }
};