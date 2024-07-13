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
        Schema::create('applicant_profile_pictures', function (Blueprint $table) {
            
            $table->id();
            $table->unsignedBigInteger('profile_pic_id')->nullable();
            $table->foreign('profile_pic_id')->references('id')->on('users');
            $table->string('url')->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicant_profile_pictures');
    }
};
