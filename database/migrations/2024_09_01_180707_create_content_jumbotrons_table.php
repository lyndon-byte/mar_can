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
        Schema::create('content_jumbotrons', function (Blueprint $table) {

            $table->id();
            $table->string('img_url')->default('https://www.pixel4k.com/wp-content/uploads/2018/09/montreal-canada-night-city-4k_1538068139.jpg.webp');
            $table->string('brand')->default('Marcan Visa Consultancy');
            $table->string('slogan')->default('Dream, Work & Succeed');
            $table->string('description')->default('A visa consultancy that serves every filipino applicants for canadian dream');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('content_jumbotrons');
    }
};
