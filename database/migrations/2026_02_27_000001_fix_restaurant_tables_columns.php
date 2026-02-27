<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('restaurant_tables', function (Blueprint $table) {
            // Rename qr_code_image_path -> qr_code_path
            if (Schema::hasColumn('restaurant_tables', 'qr_code_image_path')) {
                $table->renameColumn('qr_code_image_path', 'qr_code_path');
            }

            // Add qr_code_generated_at if missing
            if (! Schema::hasColumn('restaurant_tables', 'qr_code_generated_at')) {
                $table->timestamp('qr_code_generated_at')->nullable()->after('qr_code_path');
            }
        });
    }

    public function down(): void
    {
        Schema::table('restaurant_tables', function (Blueprint $table) {
            if (Schema::hasColumn('restaurant_tables', 'qr_code_path')) {
                $table->renameColumn('qr_code_path', 'qr_code_image_path');
            }

            if (Schema::hasColumn('restaurant_tables', 'qr_code_generated_at')) {
                $table->dropColumn('qr_code_generated_at');
            }
        });
    }
};
