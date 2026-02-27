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
        Schema::create('restaurant_tables', function (Blueprint $table) {
            $table->id();
            $table->string('table_number', 20)->unique();
            $table->string('table_name', 100)->nullable()->comment('Optional friendly name');
            $table->string('qr_code_string', 255)->unique();
            $table->string('qr_code_path', 500)->nullable();
            $table->tinyInteger('capacity')->default(4);
            $table->string('location', 100)->nullable()->comment('Indoor/Outdoor/Patio');
            $table->enum('status', ['available', 'occupied', 'reserved', 'maintenance'])->default('available');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index('status');
            $table->index('qr_code_string');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurant_tables');
    }
};
