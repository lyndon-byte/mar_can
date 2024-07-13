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
        Schema::create('applicant_educational_back_grounds', function (Blueprint $table) {

            $table->id();
            $table->unsignedBigInteger('educational_background_id')->nullable();
            $table->foreign('educational_background_id')->references('id')->on('users');
            $table->string('degree')->nullable();
            $table->string('school_name')->nullable();
            $table->string('graduation_date')->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicant_educational_back_grounds');
    }
};
