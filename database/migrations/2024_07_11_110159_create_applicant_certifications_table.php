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
        Schema::create('applicant_certifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cert_id')->nullable();
            $table->foreign('cert_id')->references('id')->on('users');
            $table->string('cert_name')->nullable();
            $table->string('cert_code_reference')->nullable();
            $table->string('cert_provider')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicant_certifications');
    }
};
