<?php

    namespace App\Http\Controllers\API;

    use App\Http\Controllers\Controller;
    use App\Models\Note;
    use Illuminate\Http\Request;

    class NoteController extends Controller
    {
        /**
         * Display a listing of the resource.
         */
        public function index()
        {
            $notes = Note::all();
            return response()->json($notes);
        }

        /**
         * Store a newly created resource in storage.
         */
        public function store(Request $request)
        {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'body' => 'required|string',
            ]);

            $note = Note::create($validatedData);
            return response()->json($note, 201);
        }

        /**
         * Display the specified resource.
         */
        public function show(Note $note)
        {
            return response()->json($note);
        }

        /**
         * Update the specified resource in storage.
         */
        public function update(Request $request, Note $note)
        {
            $validatedData = $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'body' => 'sometimes|required|string',
            ]);

            $note->update($validatedData);
            return response()->json($note);
        }

        /**
         * Remove the specified resource from storage.
         */
        public function destroy(Note $note)
        {
            $note->delete();
            return response()->json(null, 204);
        }
    }
