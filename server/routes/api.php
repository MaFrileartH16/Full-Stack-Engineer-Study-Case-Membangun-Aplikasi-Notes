<?php

    use App\Http\Controllers\API\NoteController;
    use Illuminate\Support\Facades\Route;

    Route::apiResource('notes', NoteController::class);
