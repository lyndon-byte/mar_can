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
        Schema::create('org_information', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('org_id');
            $table->foreign('org_id')->references('id')->on('users');
            $table->string('org_name');
            $table->string('org_overview')->nullable();
            $table->string('org_street')->nullable();
            $table->string('org_city')->nullable();
            $table->string('org_province')->nullable();
            $table->string('org_country')->nullable();
            $table->string('org_industry')->nullable();
            $table->string('org_size')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('org_information');
    }
};
