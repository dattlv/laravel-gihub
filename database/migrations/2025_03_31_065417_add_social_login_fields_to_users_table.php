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
        Schema::table('users', function (Blueprint $table) {
            // Google fields
            $table->string('google_id')->nullable();
            $table->string('google_token')->nullable();
            $table->string('google_refresh_token')->nullable();

            // Facebook fields
            $table->string('facebook_id')->nullable();
            $table->string('facebook_token')->nullable();
            $table->string('facebook_refresh_token')->nullable();

            // GitHub fields
            $table->string('github_id')->nullable();
            $table->string('github_token')->nullable();
            $table->string('github_refresh_token')->nullable();

            // GitLab fields
            $table->string('gitlab_id')->nullable();
            $table->string('gitlab_token')->nullable();
            $table->string('gitlab_refresh_token')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'google_id',
                'google_token',
                'google_refresh_token',
                'facebook_id',
                'facebook_token',
                'facebook_refresh_token',
                'github_id',
                'github_token',
                'github_refresh_token',
                'gitlab_id',
                'gitlab_token',
                'gitlab_refresh_token',
            ]);
        });
    }
};
