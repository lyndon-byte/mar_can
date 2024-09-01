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
        Schema::create('message_threads', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('thread_id');
            $table->foreign('thread_id')->references('id')->on('users');
            $table->string('recipient_name');
            $table->string('recipient_email'); // use to redirect properly the message
            $table->text('latest_message');
            $table->integer('latest_message_count');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('message_threads');
    }
};
