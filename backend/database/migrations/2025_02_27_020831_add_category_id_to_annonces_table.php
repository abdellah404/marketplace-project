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
        Schema::table('annonces', function (Blueprint $table) {
            // Supprimer l'ancienne colonne

            // Ajouter la nouvelle colonne category_id avec clé étrangère
            $table->unsignedBigInteger('category_id')->after('id')->nullable();
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('annonces', function (Blueprint $table) {
            // Restaurer l'ancienne colonne
            $table->string('category')->nullable();

            // Supprimer la clé étrangère et la colonne category_id
            $table->dropForeign(['category_id']);
            $table->dropColumn('category_id');
        });
    }
};
