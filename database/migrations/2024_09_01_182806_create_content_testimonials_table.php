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
        Schema::create('content_testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('avatar_img')->nullable();
            $table->string('full_name')->nullable();
            $table->text('testimony')->nullable();
            $table->text('job')->nullable();
            $table->text('workplace')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('content_testimonials');
    }
};
